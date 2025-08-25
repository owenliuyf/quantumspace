"use client"

import { useState } from "react"
import { ArrowLeft, Shield, AlertTriangle, TrendingDown, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface RiskManagementProps {
  onBack: () => void
}

export default function RiskManagement({ onBack }: RiskManagementProps) {
  const [riskTolerance, setRiskTolerance] = useState([3])
  const [stopLoss, setStopLoss] = useState([-8])
  const [takeProfit, setTakeProfit] = useState([15])
  const [positionSize, setPositionSize] = useState([20])
  const [autoRebalance, setAutoRebalance] = useState(true)
  const [riskAlertsEnabled, setRiskAlertsEnabled] = useState(true)

  const riskMetrics = {
    portfolioRisk: 35,
    var95: -12.5,
    maxDrawdown: -8.3,
    sharpeRatio: 1.45,
    beta: 1.12,
    correlation: 0.78,
  }

  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "仓位集中度过高",
      description: "您在科技股的配置占比达到45%，建议适当分散投资",
      severity: "中等",
      time: "2小时前",
    },
    {
      id: 2,
      type: "info",
      title: "止损触发提醒",
      description: "TSLA已触发8%止损线，系统已自动执行止损",
      severity: "低",
      time: "1天前",
    },
    {
      id: 3,
      type: "error",
      title: "风险敞口超限",
      description: "当前风险敞口已超过设定阈值，请及时调整仓位",
      severity: "高",
      time: "3天前",
    },
  ]

  const getAlertColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-400 bg-red-500/10 border-red-500/30"
      case "warning":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30"
      case "info":
        return "text-blue-400 bg-blue-500/10 border-blue-500/30"
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/30"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "高":
        return "text-red-400"
      case "中等":
        return "text-amber-400"
      case "低":
        return "text-green-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div>
        <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-400 hover:text-slate-100 mb-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回总览
        </Button>
        <h1 className="text-2xl font-bold text-slate-100">风险管理</h1>
        <p className="text-slate-400 text-sm">监控和管理投资风险，保护您的资产</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-slate-800/50">
          <TabsTrigger value="overview">风险概览</TabsTrigger>
          <TabsTrigger value="settings">风险设置</TabsTrigger>
          <TabsTrigger value="alerts">风险预警</TabsTrigger>
          <TabsTrigger value="analysis">风险分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* 风险指标卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 flex items-center text-base">
                  <Shield className="mr-2 h-5 w-5 text-emerald-500" />
                  组合风险等级
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">{riskMetrics.portfolioRisk}%</div>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">中等风险</Badge>
                  <div className="mt-3">
                    <Progress value={riskMetrics.portfolioRisk} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 flex items-center text-base">
                  <TrendingDown className="mr-2 h-5 w-5 text-red-500" />
                  最大回撤
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">{riskMetrics.maxDrawdown}%</div>
                  <div className="text-sm text-slate-400">过去12个月</div>
                  <div className="mt-3">
                    <Progress value={Math.abs(riskMetrics.maxDrawdown)} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-100 flex items-center text-base">
                  <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
                  夏普比率
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{riskMetrics.sharpeRatio}</div>
                  <div className="text-sm text-slate-400">风险调整收益</div>
                  <div className="mt-3">
                    <Progress value={riskMetrics.sharpeRatio * 50} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 详细风险指标 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">风险指标详情</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">VaR (95%置信度)</span>
                    <span className="text-red-400">{riskMetrics.var95}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Beta系数</span>
                    <span className="text-slate-300">{riskMetrics.beta}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">与市场相关性</span>
                    <span className="text-slate-300">{riskMetrics.correlation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">波动率</span>
                    <span className="text-amber-400">18.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">风险分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 flex items-center justify-center">
                  <div className="text-slate-500 text-sm">风险分布图表</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">基础风险设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-slate-300 mb-2 block">风险承受能力</Label>
                  <Slider
                    value={riskTolerance}
                    onValueChange={setRiskTolerance}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>保守</span>
                    <span>平衡</span>
                    <span>激进</span>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block">止损比例 (%)</Label>
                  <Slider value={stopLoss} onValueChange={setStopLoss} max={-1} min={-20} step={1} className="w-full" />
                  <div className="text-center text-sm text-slate-400 mt-1">当前设置: {stopLoss[0]}%</div>
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block">止盈比例 (%)</Label>
                  <Slider
                    value={takeProfit}
                    onValueChange={setTakeProfit}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-slate-400 mt-1">当前设置: +{takeProfit[0]}%</div>
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block">单笔仓位上限 (%)</Label>
                  <Slider
                    value={positionSize}
                    onValueChange={setPositionSize}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-slate-400 mt-1">当前设置: {positionSize[0]}%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">高级设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">自动再平衡</Label>
                    <p className="text-sm text-slate-500">定期调整资产配置</p>
                  </div>
                  <Switch checked={autoRebalance} onCheckedChange={setAutoRebalance} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">风险预警</Label>
                    <p className="text-sm text-slate-500">实时监控风险变化</p>
                  </div>
                  <Switch checked={riskAlertsEnabled} onCheckedChange={setRiskAlertsEnabled} />
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block">最大持仓数量</Label>
                  <Input type="number" defaultValue="20" className="bg-slate-800 border-slate-700" />
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block">再平衡频率</Label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-300">
                    <option value="weekly">每周</option>
                    <option value="monthly">每月</option>
                    <option value="quarterly">每季度</option>
                  </select>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">保存设置</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-full ${getAlertColor(alert.type).split(" ")[1]} ${getAlertColor(alert.type).split(" ")[2]}`}
                    >
                      <AlertTriangle className={`h-4 w-4 ${getAlertColor(alert.type).split(" ")[0]}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-medium text-slate-100">{alert.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          <span className="text-xs text-slate-500">{alert.time}</span>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm">{alert.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">风险趋势分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 flex items-center justify-center">
                  <div className="text-slate-500 text-sm">风险趋势图表</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">压力测试</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-sm text-slate-400 mb-1">市场下跌10%情景</div>
                    <div className="text-lg font-medium text-red-400">-8.5%</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-sm text-slate-400 mb-1">利率上升2%情景</div>
                    <div className="text-lg font-medium text-red-400">-6.2%</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-sm text-slate-400 mb-1">美元贬值15%情景</div>
                    <div className="text-lg font-medium text-emerald-400">+4.3%</div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">运行完整压力测试</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
