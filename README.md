WITH SubnetBoundaries AS (
    SELECT 
        head_int, tail_int
    FROM ng_inam.subnet
    WHERE cidr = :cidr
),
MatchingCIDRs AS (
    SELECT DISTINCT a.cidr, a.head_int
    FROM ng_inam.assignment a
    JOIN SubnetBoundaries sb 
        ON a.head_int BETWEEN sb.head_int AND sb.tail_int
        AND a.tail_int BETWEEN sb.head_int AND sb.tail_int
    UNION
    SELECT DISTINCT i.cidr, i.head_int
    FROM ng_inam.ip_audit_backbone_config_feed i
    JOIN SubnetBoundaries sb 
        ON i.head_int BETWEEN sb.head_int AND sb.tail_int
        AND i.tail_int BETWEEN sb.head_int AND sb.tail_int
),
FilteredCIDRs AS (
    SELECT cidr
    FROM MatchingCIDRs
    WHERE cidr NOT LIKE '%/31'  -- Exclude /31 CIDRs initially
),
ExtractedCIDRs AS (
    SELECT cidr
    FROM MatchingCIDRs m31
    WHERE cidr LIKE '%/31'
    AND NOT EXISTS (  -- Ignore /31 if a corresponding /32 exists
        SELECT 1 
        FROM MatchingCIDRs m32 
        WHERE m32.cidr LIKE '%/32' 
        AND m32.head_int BETWEEN m31.head_int AND m31.head_int + 1
    )
)
SELECT * FROM FilteredCIDRs
UNION ALL
SELECT * FROM ExtractedCIDRs;
