# Core Ledger Monitoring Stack

轻量级监控方案，适用于 2核4G 服务器环境。

## 架构组件

- **Prometheus**: 指标收集和存储
- **Node Exporter**: 系统指标采集
- **Grafana**: 可视化平台

## 资源占用

| 组件 | CPU | 内存 | 说明 |
|------|-----|------|------|
| Prometheus | 0.5 核 | 512MB | 指标存储 30 天，最大 8GB |
| Node Exporter | 0.1 核 | 64MB | 系统指标采集 |
| Grafana | 0.2 核 | 256MB | 可视化界面 |
| **总计** | **0.8 核** | **832MB** | 适合 2C4G 环境 |

## 快速开始

### 1. 启动监控服务

```bash
cd /mnt/h/core-ledger/monitoring
docker-compose up -d
```

### 2. 检查服务状态

```bash
docker-compose ps
docker-compose logs -f
```

### 3. 访问界面

- **Grafana**: http://localhost:3000 (admin/admin123)
- **Prometheus**: http://localhost:9090

### 4. 停止服务

```bash
docker-compose down
```

### 5. 完全清理（包括数据）

```bash
docker-compose down -v
```

## Grafana 配置

### 导入预制仪表板

1. 登录 Grafana (http://localhost:3000)
2. 点击左侧菜单 "Dashboards" -> "Import"
3. 输入以下 Dashboard ID 并导入:

   - **10280**: Spring Boot 2.1 Statistics
   - **4701**: JVM (Micrometer)
   - **1860**: Node Exporter Full

### 自定义仪表板

创建自定义仪表板监控业务指标:

- QPS (每秒请求数)
- 响应时间 (P95, P99)
- 错误率
- 账单创建数
- JVM 堆内存使用
- 数据库连接池状态

## 告警规则

已配置的告警规则 (config/alerts.yml):

- 应用宕机告警
- CPU 使用率 > 80%
- 内存使用率 > 85%
- 磁盘使用率 > 85%
- HTTP 5xx 错误率 > 5%
- API 响应时间 > 1秒
- JVM 堆内存使用率 > 85%

## 常用 PromQL 查询

### 应用指标

```promql
# QPS (每秒请求数)
rate(http_server_requests_seconds_count{application="core-ledger-service"}[1m])

# P95 响应时间
histogram_quantile(0.95, rate(http_server_requests_seconds_bucket{application="core-ledger-service"}[5m]))

# 错误率
rate(http_server_requests_seconds_count{application="core-ledger-service",status=~"5.."}[5m])

# JVM 堆内存使用率
(jvm_memory_used_bytes{area="heap"} / jvm_memory_max_bytes{area="heap"}) * 100

# 数据库连接池活跃连接数
hikaricp_connections_active{application="core-ledger-service"}

# 账单创建速率
rate(business_ledger_created_total[5m])
```

### 系统指标

```promql
# CPU 使用率
100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# 内存使用率
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

# 磁盘使用率
(1 - (node_filesystem_avail_bytes / node_filesystem_size_bytes)) * 100
```

## 故障排查

### Prometheus 无法采集 Spring Boot 指标

1. 检查 Spring Boot 应用是否启动:
   ```bash
   curl http://localhost:8080/code-ledger/actuator/health
   ```

2. 检查 Prometheus 端点是否可访问:
   ```bash
   curl http://localhost:8080/code-ledger/actuator/prometheus
   ```

3. 检查 Prometheus targets 状态:
   访问 http://localhost:9090/targets

### Grafana 无法连接 Prometheus

1. 检查 Prometheus 是否运行:
   ```bash
   docker ps | grep prometheus
   ```

2. 测试 Prometheus 连接:
   ```bash
   curl http://localhost:9090/api/v1/status/config
   ```

3. 在 Grafana 中测试数据源:
   Configuration -> Data Sources -> Prometheus -> Test

## 性能优化建议

### 对于 2C4G 服务器

1. **Prometheus 数据保留**: 已设置为 30 天，最大 8GB
2. **采集间隔**: 15 秒（可根据需要调整到 30 秒以降低负载）
3. **内存限制**: 已为每个容器设置内存限制
4. **CPU 限制**: 已为每个容器设置 CPU 限制

### 如果资源不足

可以考虑:
1. 增加采集间隔到 30 秒
2. 减少数据保留时间到 15 天
3. 暂时不启动 Grafana，直接使用 Prometheus UI

## 维护

### 数据备份

```bash
# 备份 Prometheus 数据
docker exec prometheus tar czf /prometheus/backup-$(date +%Y%m%d).tar.gz /prometheus/data

# 备份 Grafana 配置
docker exec grafana tar czf /var/lib/grafana/backup-$(date +%Y%m%d).tar.gz /var/lib/grafana
```

### 日志查看

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f prometheus
docker-compose logs -f grafana
```

## 下一步

1. 导入 Grafana 仪表板
2. 配置告警通知（邮件/企业微信）
3. 根据业务需求添加自定义指标
4. 定期检查和优化查询性能

## 注意事项

- 首次启动 Grafana 需要修改默认密码
- Prometheus 数据存储在 Docker volume 中，删除容器不会丢失数据
- 建议定期备份 Grafana 仪表板配置
- 监控本身也会消耗资源，请根据实际情况调整配置
