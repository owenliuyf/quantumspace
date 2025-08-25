"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Edit3, Trash2, PieChart, BarChart3, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PortfolioManagementProps {
  onBack: () => void
}

export default function PortfolioManagement({ onBack }: PortfolioManagementProps) {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  // 推荐投资组合
  const recommendedPortfolios = [
    {
      id: "conservative",
      name: "稳健增长组合",
      description: "适合风险偏好较低的投资者",
      expectedReturn: "8-12%",
      riskLevel: "低",
      minInvestment: 10000,
      assets: [
        { symbol: "SPY", name: "标普500ETF", allocation: 40, type: "股票" },
        { symbol: "BND", name: "债券ETF", allocation: 30, type: "债券" },
        { symbol: "GOLD", name: "黄金ETF", allocation: 20, type: "商品" },
        { symbol: "CASH", name: "现金", allocation: 10, type: "现金" },
      ],
      performance: { ytd: 8.5, oneYear: 12.3, threeYear: 9.8 },
      rating: 4.2,
    },
    {
      id: "growth",
      name: "成长型组合",
      description: "追求长期资本增值",
      expectedReturn: "12-18%",
      riskLevel: "中",
      minInvestment: 15000,
      assets: [
        { symbol: "QQQ", name: "纳斯达克100ETF", allocation: 35, type: "股票" },
        { symbol: "VTI", name: "全市场ETF", allocation: 25, type: "股票" },
        { symbol: "VXUS", name: "国际股票ETF", allocation: 20, type: "股票" },
        { symbol: "VNQ", name: "房地产ETF", allocation: 15, type: "房地产" },
        { symbol: "CASH", name: "现金", allocation: 5, type: "现金" },
      ],
      performance: { ytd: 15.2, oneYear: 18.7, threeYear: 14.5 },
      rating: 4.5,
    },
    {
      id: "aggressive",
      name: "激进增长组合",
      description: "高风险高收益策略",
      expectedReturn: "18-25%",
      riskLevel: "高",
      minInvestment: 25000,
      assets: [
        { symbol: "ARKK", name: "创新科技ETF", allocation: 30, type: "股票" },
        { symbol: "TSLA", name: "特斯拉", allocation: 20, type: "股票" },
        { symbol: "NVDA", name: "英伟达", allocation: 15, type: "股票" },
        { symbol: "BTC", name: "比特币", allocation: 15, type: "加密货币" },
        { symbol: "AAPL", name: "苹果", allocation: 10, type: "股票" },
        { symbol: "CASH", name: "现金", allocation: 10, type: "现金" },
      ],
      performance: { ytd: 22.8, oneYear: 28.4, threeYear: 19.2 },
      rating: 4.0,
    },
  ]

  // 用户自定义组合
  const [userPortfolios, setUserPortfolios] = useState([
    {
      id: "user1",
      name: "我的科技组合",
      description: "专注科技股投资",
      totalValue: 125000,
      dailyChange: 2.34,
      assets: [
        { symbol: "AAPL", name: "苹果", allocation: 25, value: 31250, change: 1.8 },
        { symbol: "MSFT", name: "微软", allocation: 20, value: 25000, change: 2.1 },
        { symbol: "GOOGL", name: "谷歌", allocation: 20, value: 25000, change: -0.5 },
        { symbol: "TSLA", name: "特斯拉", allocation: 15, value: 18750, change: 3.2 },
        { symbol: "NVDA", name: "英伟达", allocation: 10, value: 12500, change: 4.5 },
        { symbol: "CASH", name: "现金", allocation: 10, value: 12500, change: 0 },
      ],
      createdAt: "2024-01-15",
      performance: { ytd: 18.5, oneYear: 24.3, threeYear: 16.8 },
    },
  ])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "低":
        return "text-green-400 bg-green-500/10 border-green-500/30"
      case "中":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30"
      case "高":
        return "text-red-400 bg-red-500/10 border-red-500/30"
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/30"
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-400 hover:text-slate-100 mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回总览
          </Button>
          <h1 className="text-2xl font-bold text-slate-100">投资组合管理</h1>
          <p className="text-slate-400 text-sm">管理您的投资组合，优化资产配置</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          创建组合
        </Button>
      </div>

      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="bg-slate-800/50">
          <TabsTrigger value="recommended">推荐组合</TabsTrigger>
          <TabsTrigger value="my-portfolios">我的组合</TabsTrigger>
          <TabsTrigger value="performance">业绩分析</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedPortfolios.map((portfolio) => (
              <Card
                key={portfolio.id}
                className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 text-lg">{portfolio.name}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-slate-300">{portfolio.rating}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">{portfolio.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-slate-500">预期收益</div>
                        <div className="text-sm font-medium text-emerald-400">{portfolio.expectedReturn}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">风险等级</div>
                        <Badge className={getRiskColor(portfolio.riskLevel)}>{portfolio.riskLevel}</Badge>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 mb-2">资产配置</div>
                      <div className="space-y-1">
                        {portfolio.assets.slice(0, 3).map((asset) => (
                          <div key={asset.symbol} className="flex items-center justify-between text-xs">
                            <span className="text-slate-300">{asset.name}</span>
                            <span className="text-slate-400">{asset.allocation}%</span>
                          </div>
                        ))}
                        {portfolio.assets.length > 3 && (
                          <div className="text-xs text-slate-500">+{portfolio.assets.length - 3} 更多资产</div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-slate-500">今年</div>
                        <div className="text-emerald-400">+{portfolio.performance.ytd}%</div>
                      </div>
                      <div>
                        <div className="text-slate-500">1年</div>
                        <div className="text-emerald-400">+{portfolio.performance.oneYear}%</div>
                      </div>
                      <div>
                        <div className="text-slate-500">3年</div>
                        <div className="text-emerald-400">+{portfolio.performance.threeYear}%</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-1">最低投资额</div>
                      <div className="text-sm font-medium text-slate-200">
                        {formatCurrency(portfolio.minInvestment)}
                      </div>
                    </div>

                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">选择此组合</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-portfolios" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userPortfolios.map((portfolio) => (
              <Card key={portfolio.id} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-slate-100 text-lg">{portfolio.name}</CardTitle>
                      <p className="text-slate-400 text-sm">{portfolio.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-slate-500">总价值</div>
                        <div className="text-xl font-bold text-slate-100">{formatCurrency(portfolio.totalValue)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">今日变化</div>
                        <div
                          className={`text-lg font-medium ${portfolio.dailyChange >= 0 ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {portfolio.dailyChange >= 0 ? "+" : ""}
                          {portfolio.dailyChange}%
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 mb-2">持仓明细</div>
                      <div className="space-y-2">
                        {portfolio.assets.map((asset) => (
                          <div
                            key={asset.symbol}
                            className="flex items-center justify-between p-2 bg-slate-800/30 rounded"
                          >
                            <div>
                              <div className="text-sm font-medium text-slate-200">{asset.symbol}</div>
                              <div className="text-xs text-slate-400">{asset.name}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-slate-300">{formatCurrency(asset.value)}</div>
                              <div className={`text-xs ${asset.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                {asset.change >= 0 ? "+" : ""}
                                {asset.change}%
                              </div>
                            </div>
                            <div className="text-xs text-slate-500 ml-4">{asset.allocation}%</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-700/50">
                      <div>
                        <div className="text-slate-500">今年</div>
                        <div className="text-emerald-400">+{portfolio.performance.ytd}%</div>
                      </div>
                      <div>
                        <div className="text-slate-500">1年</div>
                        <div className="text-emerald-400">+{portfolio.performance.oneYear}%</div>
                      </div>
                      <div>
                        <div className="text-slate-500">3年</div>
                        <div className="text-emerald-400">+{portfolio.performance.threeYear}%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-emerald-500" />
                  组合对比分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 flex items-center justify-center">
                  <div className="text-slate-500 text-sm">组合业绩对比图表</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center">
                  <PieChart className="mr-2 h-5 w-5 text-blue-500" />
                  资产配置分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 flex items-center justify-center">
                  <div className="text-slate-500 text-sm">资产配置饼图</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 创建组合表单 */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-slate-900 border-slate-700 w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-slate-100">创建新组合</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">
                    组合名称
                  </Label>
                  <Input id="name" placeholder="输入组合名称" className="bg-slate-800 border-slate-700" />
                </div>
                <div>
                  <Label htmlFor="description" className="text-slate-300">
                    描述
                  </Label>
                  <Input id="description" placeholder="输入组合描述" className="bg-slate-800 border-slate-700" />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowCreateForm(false)}>
                    取消
                  </Button>
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setShowCreateForm(false)}
                  >
                    创建
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
