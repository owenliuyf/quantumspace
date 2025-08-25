"use client"

import { useState } from "react"
import { ArrowLeft, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AnalystViewsProps {
  onBack: () => void
}

export default function AnalystViews({ onBack }: AnalystViewsProps) {
  const [selectedAnalyst, setSelectedAnalyst] = useState<string | null>(null)

  const analysts = [
    {
      id: "zhang-wei",
      name: "张伟",
      title: "首席策略分析师",
      company: "华尔街投资",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      followers: 12500,
      experience: 15,
      specialty: ["美股", "科技股", "宏观经济"],
      tradingStyle: "价值投资 + 技术分析",
      winRate: 78.5,
      avgHoldingPeriod: "3-6个月",
      totalReturns: 156.8,
      description: "专注于美股科技板块投资，擅长基本面分析和长期价值发现。曾成功预测多次市场转折点。",
      recentViews: [
        {
          date: "2024-01-20",
          title: "AI芯片板块迎来新机遇",
          symbol: "NVDA",
          action: "买入",
          targetPrice: 520,
          currentPrice: 478,
          confidence: 85,
          summary: "随着AI应用的快速发展，芯片需求将持续增长，NVDA作为行业龙头将显著受益。",
        },
        {
          date: "2024-01-18",
          title: "苹果公司估值修复在即",
          symbol: "AAPL",
          action: "持有",
          targetPrice: 200,
          currentPrice: 185,
          confidence: 72,
          summary: "尽管近期承压，但iPhone 15销量超预期，服务业务增长稳健，估值具备修复空间。",
        },
      ],
      performance: {
        ytd: 18.5,
        oneYear: 24.3,
        threeYear: 16.8,
        maxDrawdown: -12.5,
        sharpeRatio: 1.45,
      },
    },
    {
      id: "lisa-chen",
      name: "陈丽莎",
      title: "外汇市场专家",
      company: "环球金融",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.6,
      followers: 8900,
      experience: 12,
      specialty: ["外汇", "大宗商品", "央行政策"],
      tradingStyle: "宏观分析 + 趋势跟踪",
      winRate: 82.3,
      avgHoldingPeriod: "1-3个月",
      totalReturns: 134.2,
      description: "资深外汇交易员，对全球宏观经济和央行政策有深入研究，擅长捕捉汇率趋势性机会。",
      recentViews: [
        {
          date: "2024-01-19",
          title: "美元强势周期或将延续",
          symbol: "DXY",
          action: "看涨",
          targetPrice: 108,
          currentPrice: 105.2,
          confidence: 78,
          summary: "美国经济韧性超预期，美联储政策立场偏鹰派，美元指数有望继续上行。",
        },
        {
          date: "2024-01-17",
          title: "欧元兑美元面临技术性调整",
          symbol: "EURUSD",
          action: "看跌",
          targetPrice: 1.075,
          currentPrice: 1.085,
          confidence: 68,
          summary: "欧洲经济增长放缓，ECB政策转向温和，EUR/USD短期面临下行压力。",
        },
      ],
      performance: {
        ytd: 15.2,
        oneYear: 19.8,
        threeYear: 14.5,
        maxDrawdown: -8.3,
        sharpeRatio: 1.62,
      },
    },
    {
      id: "mike-wang",
      name: "王明",
      title: "量化投资总监",
      company: "智能资本",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.7,
      followers: 15200,
      experience: 10,
      specialty: ["量化策略", "算法交易", "风险管理"],
      tradingStyle: "量化模型 + 高频交易",
      winRate: 85.7,
      avgHoldingPeriod: "1-4周",
      totalReturns: 198.5,
      description: "量化投资专家，开发多个高频交易策略，在风险控制和收益优化方面有独特见解。",
      recentViews: [
        {
          date: "2024-01-21",
          title: "市场波动率策略机会显现",
          symbol: "VIX",
          action: "交易",
          targetPrice: 22,
          currentPrice: 18.5,
          confidence: 88,
          summary: "基于历史数据和模型预测，市场波动率有望在未来2-3周内上升。",
        },
        {
          date: "2024-01-16",
          title: "高频动量策略表现优异",
          symbol: "SPY",
          action: "算法交易",
          targetPrice: 485,
          currentPrice: 478,
          confidence: 92,
          summary: "短期动量因子强劲，算法模型显示SPY具备继续上涨动能。",
        },
      ],
      performance: {
        ytd: 22.8,
        oneYear: 31.5,
        threeYear: 21.2,
        maxDrawdown: -6.8,
        sharpeRatio: 2.15,
      },
    },
  ]

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "买入":
      case "看涨":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
      case "卖出":
      case "看跌":
        return "text-red-400 bg-red-500/10 border-red-500/30"
      case "持有":
        return "text-blue-400 bg-blue-500/10 border-blue-500/30"
      default:
        return "text-amber-400 bg-amber-500/10 border-amber-500/30"
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
        <h1 className="text-2xl font-bold text-slate-100">分析师观点</h1>
        <p className="text-slate-400 text-sm">跟随专业分析师，获取市场洞察</p>
      </div>

      {selectedAnalyst ? (
        // 分析师详情页
        <div className="space-y-6">
          {(() => {
            const analyst = analysts.find((a) => a.id === selectedAnalyst)!
            return (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAnalyst(null)}
                  className="text-slate-400 hover:text-slate-100"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回分析师列表
                </Button>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={analyst.avatar || "/placeholder.svg"} alt={analyst.name} />
                        <AvatarFallback className="bg-emerald-600 text-white text-lg">
                          {analyst.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h2 className="text-2xl font-bold text-slate-100">{analyst.name}</h2>
                            <p className="text-slate-400">
                              {analyst.title} · {analyst.company}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-slate-300">{analyst.rating}</span>
                            </div>
                            <Button className="bg-emerald-600 hover:bg-emerald-700">+ 关注</Button>
                          </div>
                        </div>

                        <p className="text-slate-300 mb-4">{analyst.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-500">胜率</div>
                            <div className="text-lg font-bold text-emerald-400">{analyst.winRate}%</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-500">总收益</div>
                            <div className="text-lg font-bold text-emerald-400">+{analyst.totalReturns}%</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-500">关注者</div>
                            <div className="text-lg font-bold text-slate-300">{analyst.followers.toLocaleString()}</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-500">经验</div>
                            <div className="text-lg font-bold text-slate-300">{analyst.experience}年</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* 最新观点 */}
                  <div className="lg:col-span-2">
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-slate-100">最新观点</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {analyst.recentViews.map((view, index) => (
                            <div key={index} className="border border-slate-700/50 rounded-lg p-4 bg-slate-800/30">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-medium text-slate-100">{view.title}</h3>
                                <div className="text-xs text-slate-500">{view.date}</div>
                              </div>

                              <div className="flex items-center space-x-4 mb-3">
                                <Badge className="bg-slate-700 text-slate-300">{view.symbol}</Badge>
                                <Badge className={getActionColor(view.action)}>{view.action}</Badge>
                                <div className="text-sm text-slate-400">
                                  目标价: ${view.targetPrice} (当前: ${view.currentPrice})
                                </div>
                                <div className="text-sm text-emerald-400">信心度: {view.confidence}%</div>
                              </div>

                              <p className="text-slate-300 text-sm">{view.summary}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 业绩统计 */}
                  <div className="space-y-6">
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-slate-100 text-base">业绩表现</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-400">今年收益</span>
                            <span className="text-emerald-400">+{analyst.performance.ytd}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">1年收益</span>
                            <span className="text-emerald-400">+{analyst.performance.oneYear}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">3年收益</span>
                            <span className="text-emerald-400">+{analyst.performance.threeYear}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">最大回撤</span>
                            <span className="text-red-400">{analyst.performance.maxDrawdown}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">夏普比率</span>
                            <span className="text-blue-400">{analyst.performance.sharpeRatio}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-slate-100 text-base">交易风格</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs text-slate-500 mb-1">策略类型</div>
                            <div className="text-sm text-slate-300">{analyst.tradingStyle}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 mb-1">持仓周期</div>
                            <div className="text-sm text-slate-300">{analyst.avgHoldingPeriod}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 mb-1">专业领域</div>
                            <div className="flex flex-wrap gap-1">
                              {analyst.specialty.map((spec) => (
                                <Badge key={spec} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )
          })()}
        </div>
      ) : (
        // 分析师列表页
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysts.map((analyst) => (
            <Card
              key={analyst.id}
              className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-colors cursor-pointer"
              onClick={() => setSelectedAnalyst(analyst.id)}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={analyst.avatar || "/placeholder.svg"} alt={analyst.name} />
                    <AvatarFallback className="bg-emerald-600 text-white">{analyst.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">{analyst.name}</h3>
                    <p className="text-slate-400 text-sm">{analyst.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-slate-300">{analyst.rating}</span>
                    </div>
                    <div className="text-slate-400 text-sm">{analyst.followers.toLocaleString()} 关注者</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500">胜率</div>
                      <div className="text-lg font-bold text-emerald-400">{analyst.winRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">总收益</div>
                      <div className="text-lg font-bold text-emerald-400">+{analyst.totalReturns}%</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-1">专业领域</div>
                    <div className="flex flex-wrap gap-1">
                      {analyst.specialty.slice(0, 3).map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm line-clamp-2">{analyst.description}</p>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">查看详情</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
