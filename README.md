WITH SubnetInfo AS (
    SELECT subnet_id, head_int, tail_int
    FROM ng_inam.subnet
    WHERE subnet_id IN :subnetIds
),
AssignmentRanges AS (
    SELECT DISTINCT a.subnet_id, a.head_int, a.tail_int
    FROM ng_inam.assignment a
    JOIN SubnetInfo s ON a.head_int BETWEEN s.head_int AND s.tail_int
                      AND a.tail_int BETWEEN s.head_int AND s.tail_int
),
FilteredBackbone AS (
    SELECT DISTINCT i.subnet_id, i.head AS head_combined, i.tail AS tail_combined
    FROM ng_inam.ip_audit_backbone_config_feed i
    JOIN SubnetInfo s ON i.head BETWEEN s.head_int AND s.tail_int
                      AND i.tail BETWEEN s.head_int AND s.tail_int
    LEFT JOIN AssignmentRanges ar ON i.head = ar.head_int
    WHERE ar.head_int IS NULL  -- Exclude backbone records where head matches assignment head
),
RawRanges AS (
    SELECT subnet_id, head_int AS head_combined, tail_int AS tail_combined FROM AssignmentRanges
    UNION
    SELECT subnet_id, head_combined, tail_combined FROM FilteredBackbone
),
TotalUtilized AS (
    SELECT subnet_id, SUM(tail_combined - head_combined + 1) AS utilized_range
    FROM RawRanges
    GROUP BY subnet_id
),
TotalRange AS (
    SELECT subnet_id, (tail_int - head_int + 1) AS total_range
    FROM SubnetInfo
)
UPDATE ng_inam.subnet s
SET utilization = COALESCE((tu.utilized_range * 100.0 / NULLIF(tr.total_range, 0)), 0)
FROM TotalRange tr
LEFT JOIN TotalUtilized tu ON tr.subnet_id = tu.subnet_id
WHERE s.subnet_id = tr.subnet_id;
