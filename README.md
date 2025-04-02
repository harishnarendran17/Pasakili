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
    AND NOT EXISTS (  -- Exclude /32 if a matching /31 exists
        SELECT 1 
        FROM FilteredCIDRs f32
        WHERE f32.cidr LIKE '%/32' 
        AND f32.head_int BETWEEN f.head_int AND f.head_int + 1
    )
),

Unique32CIDRs AS (
    SELECT f32.cidr
    FROM FilteredCIDRs f32
    WHERE f32.cidr LIKE '%/32'
    AND NOT EXISTS (  -- Only include /32 if no matching /31 exists
        SELECT 1
        FROM FilteredCIDRs f31
        WHERE f31.cidr LIKE '%/31'
        AND f32.head_int BETWEEN f31.head_int AND f31.head_int + 1
    )
)

SELECT cidr FROM FilteredCIDRs
WHERE cidr NOT LIKE '%/32' AND cidr NOT LIKE '%/31'  -- Keep everything except /31 and /32 for separate handling
UNION ALL
SELECT * FROM ExtractedCIDRs  -- Include valid /31 CIDRs
UNION ALL
SELECT * FROM Unique32CIDRs;  -- Include /32 CIDRs that don’t have a matching /31
