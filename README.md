WITH SubnetInfo AS ( 
    SELECT subnet_id, head_int, tail_int 
    FROM ng_inam.subnet 
    WHERE subnet_id IN (:subnetIds) 
), 
AssignmentIPs AS ( 
    SELECT s.subnet_id, generate_series(a.head_int, a.tail_int) AS ip 
    FROM ng_inam.assignment a 
    JOIN SubnetInfo s ON a.head_int BETWEEN s.head_int AND s.tail_int 
                      AND a.tail_int BETWEEN s.head_int AND s.tail_int 
), 
BackboneIPs AS ( 
    SELECT s.subnet_id, i.head AS ip 
    FROM ng_inam.ip_audit_backbone_config_feed i 
    JOIN SubnetInfo s ON i.head BETWEEN s.head_int AND s.tail_int 
                      AND i.tail BETWEEN s.head_int AND s.tail_int 
    WHERE NOT EXISTS ( 
        SELECT 1 FROM ng_inam.assignment a WHERE a.head_int = i.head 
    ) 
), 
CombinedIPs AS ( 
    SELECT subnet_id, ip FROM AssignmentIPs 
    UNION 
    SELECT subnet_id, ip FROM BackboneIPs 
), 
UniqueUtilized AS ( 
    SELECT subnet_id, COUNT(DISTINCT ip) AS utilized_ips 
    FROM CombinedIPs 
    GROUP BY subnet_id 
), 
TotalRange AS ( 
    SELECT subnet_id, (tail_int - head_int + 1) AS total_ips 
    FROM SubnetInfo 
), 
UpdateValues AS ( 
    SELECT tr.subnet_id, COALESCE((uu.utilized_ips * 100.0 / NULLIF(tr.total_ips, 0)), 0) AS new_utilization 
    FROM TotalRange tr 
    LEFT JOIN UniqueUtilized uu ON tr.subnet_id = uu.subnet_id 
) 
UPDATE ng_inam.subnet s 
SET utilization = uv.new_utilization 
FROM UpdateValues uv 
WHERE s.subnet_id = uv.subnet_id;
