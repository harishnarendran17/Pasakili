@Transactional
@Modifying
@Query(
    value = "WITH SubnetInfo AS (\r\n" +
            "    SELECT subnet_id, head_int, tail_int\r\n" +
            "    FROM ng_inam.subnet\r\n" +
            "    WHERE subnet_id IN (:subnetIds)\r\n" +
            "),\r\n" +
            "AssignmentRanges AS (\r\n" +
            "    SELECT DISTINCT s.subnet_id, a.head_int AS head_combined, a.tail_int AS tail_combined\r\n" +
            "    FROM ng_inam.assignment a\r\n" +
            "    JOIN SubnetInfo s \r\n" +
            "        ON a.head_int BETWEEN s.head_int AND s.tail_int\r\n" +
            "        AND a.tail_int BETWEEN s.head_int AND s.tail_int\r\n" +
            "),\r\n" +
            "BackboneRanges AS (\r\n" +
            "    SELECT DISTINCT s.subnet_id, i.head AS head_combined, i.tail AS tail_combined\r\n" +
            "    FROM ng_inam.ip_audit_backbone_config_feed i\r\n" +
            "    JOIN SubnetInfo s \r\n" +
            "        ON i.head BETWEEN s.head_int AND s.tail_int\r\n" +
            "        AND i.tail BETWEEN s.head_int AND s.tail_int\r\n" +
            "    WHERE NOT EXISTS (\r\n" +
            "        SELECT 1 FROM ng_inam.assignment a\r\n" +
            "        WHERE a.head_int = i.head\r\n" +
            "    )\r\n" +
            "),\r\n" +
            "CombinedRanges AS (\r\n" +
            "    SELECT * FROM AssignmentRanges\r\n" +
            "    UNION\r\n" +
            "    SELECT * FROM BackboneRanges\r\n" +
            "),\r\n" +
            "TotalUtilized AS (\r\n" +
            "    SELECT subnet_id, SUM(tail_combined - head_combined + 1) AS utilized_range\r\n" +
            "    FROM CombinedRanges\r\n" +
            "    GROUP BY subnet_id\r\n" +
            "),\r\n" +
            "TotalRange AS (\r\n" +
            "    SELECT subnet_id, (tail_int - head_int + 1) AS total_range\r\n" +
            "    FROM SubnetInfo\r\n" +
            ")\r\n" +
            "UPDATE ng_inam.subnet\r\n" +
            "SET utilization = COALESCE((tu.utilized_range * 100.0 / NULLIF(tr.total_range, 0)), 0)\r\n" +
            "FROM TotalRange tr\r\n" +
            "LEFT JOIN TotalUtilized tu ON tr.subnet_id = tu.subnet_id\r\n" +
            "WHERE ng_inam.subnet.subnet_id = tr.subnet_id",
    nativeQuery = true
)
void updateUtilization(@Param("subnetIds") List<BigDecimal> subnetIds);
