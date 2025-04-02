WITH SubnetBoundaries AS (
    SELECT head_int, tail_int
    FROM ng_inam.subnet
    WHERE cidr = :cidr
),

AssignmentCIDRs AS (
    SELECT DISTINCT a.cidr, a.head_int
    FROM ng_inam.assignment a
    JOIN SubnetBoundaries sb 
        ON a.head_int BETWEEN sb.head_int AND sb.tail_int
        AND a.tail_int BETWEEN sb.head_int AND sb.tail_int
),

BackboneCIDRs AS (
    SELECT DISTINCT i.cidr, i.head
    FROM ng_inam.ip_audit_backbone_config_feed i
    JOIN SubnetBoundaries sb 
        ON i.head BETWEEN sb.head_int AND sb.tail_int
        AND i.tail BETWEEN sb.head_int AND sb.tail_int
    WHERE NOT EXISTS (  -- Ignore Backbone CIDRs if they exist in Assignment
        SELECT 1 FROM AssignmentCIDRs a
        WHERE a.head_int = i.head
    )
),

FilteredCIDRs AS (
    SELECT cidr, head_int FROM AssignmentCIDRs
    UNION ALL
    SELECT cidr, head AS head_int FROM BackboneCIDRs
),

ExtractedCIDRs AS (
    SELECT f.cidr
    FROM FilteredCIDRs f
    WHERE f.cidr LIKE '%/31'
    AND NOT EXISTS (  -- Exclude /32 if /31 exists in Assignment
        SELECT 1 
        FROM AssignmentCIDRs a
        WHERE a.cidr LIKE '%/32' 
        AND a.head_int BETWEEN f.head_int AND f.head_int + 1
    )
)

SELECT cidr FROM FilteredCIDRs
WHERE cidr NOT LIKE '%/32'  -- Remove /32 CIDRs first
UNION ALL
SELECT * FROM ExtractedCIDRs;
