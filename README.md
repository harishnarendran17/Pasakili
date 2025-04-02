WITH SubnetBoundaries AS (
    SELECT head_int, tail_int
    FROM ng_inam.subnet
    WHERE cidr = :input_cidr
),

AssignmentCIDRs AS (
    SELECT DISTINCT a.cidr
    FROM ng_inam.assignment a
    JOIN SubnetBoundaries sb 
        ON a.head_int BETWEEN sb.head_int AND sb.tail_int
),

BackboneCIDRs AS (
    SELECT DISTINCT b.cidr
    FROM ng_inam.ip_audit_backbone_config_feed b
    JOIN SubnetBoundaries sb 
        ON b.head BETWEEN sb.head_int AND sb.tail_int
)

SELECT cidr FROM AssignmentCIDRs
UNION
SELECT cidr FROM BackboneCIDRs;
