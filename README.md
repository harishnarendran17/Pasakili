@Transactional
@Modifying
@Query(value = """
    WITH SubnetInfo AS (
        SELECT subnet_id, head_int, tail_int
        FROM ng_inam.subnet
        WHERE subnet_id IN :subnetIds
    ),
    -- Get Assignment IP Ranges
    AssignmentRanges AS (
        SELECT DISTINCT s.subnet_id, a.head_int AS head_combined, a.tail_int AS tail_combined
        FROM ng_inam.assignment a
        JOIN SubnetInfo s 
            ON a.head_int BETWEEN s.head_int AND s.tail_int
            AND a.tail_int BETWEEN s.head_int AND s.tail_int
    ),
    -- Get Backbone IP Ranges but ignore if they exist in Assignment
    BackboneRanges AS (
        SELECT DISTINCT s.subnet_id, i.head AS head_combined, i.tail AS tail_combined
        FROM ng_inam.ip_audit_backbone_config_feed i
        JOIN SubnetInfo s 
            ON i.head BETWEEN s.head_int AND s.tail_int
            AND i.tail BETWEEN s.head_int AND s.tail_int
        WHERE NOT EXISTS (
            SELECT 1 FROM ng_inam.assignment a
            WHERE a.head_int = i.head  -- Ignore Backbone if Assignment has the same head
        )
    ),
    -- Combine Unique Ranges from Assignment and Backbone
    CombinedRanges AS (
        SELECT * FROM AssignmentRanges
        UNION
        SELECT * FROM BackboneRanges
    ),
    -- Calculate Total Utilized IPs
    TotalUtilized AS (
        SELECT subnet_id, SUM(tail_combined - head_combined + 1) AS utilized_range
        FROM CombinedRanges
        GROUP BY subnet_id
    ),
    -- Calculate Total IPs in the Subnet
    TotalRange AS (
        SELECT subnet_id, (tail_int - head_int + 1) AS total_range
        FROM SubnetInfo
    )
    -- Update Utilization in Subnet Table
    UPDATE ng_inam.subnet
    SET utilization = COALESCE((tu.utilized_range * 100.0 / NULLIF(tr.total_range, 0)), 0)
    FROM TotalRange tr
    LEFT JOIN TotalUtilized tu ON tr.subnet_id = tu.subnet_id
    WHERE ng_inam.subnet.subnet_id = tr.subnet_id;
""", nativeQuery = true)
void updateUtilization(@Param("subnetIds") List<BigDecimal> subnetIds);
