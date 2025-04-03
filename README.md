WITH SubnetBoundaries AS (
    SELECT head_int, tail_int
    FROM ng_inam.subnet
    WHERE cidr = :input_cidr
),

AssignmentCIDRs AS (
    SELECT DISTINCT a.cidr, a.head_int
    FROM ng_inam.assignment a
    JOIN SubnetBoundaries sb 
        ON a.head_int BETWEEN sb.head_int AND sb.tail_int
    WHERE a.hold_until IS NOT NULL
),

BackboneCIDRs AS (
    SELECT DISTINCT b.cidr, b.head
    FROM ng_inam.ip_audit_backbone_config_feed b
    JOIN SubnetBoundaries sb 
        ON b.head BETWEEN sb.head_int AND sb.tail_int
),

FilteredBackboneCIDRs AS (
    SELECT b.cidr, b.head
    FROM BackboneCIDRs b
    WHERE NOT EXISTS (
        SELECT 1
        FROM AssignmentCIDRs a
        WHERE a.cidr LIKE '%/31'
          AND a.head_int = b.head
          AND b.cidr LIKE '%/32'
    )
)

SELECT cidr FROM AssignmentCIDRs
UNION ALL
SELECT cidr FROM FilteredBackboneCIDRs;
