"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  BarChart3,
  LineChart,
  Activity,
  Zap,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeft,
  Bot,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface MarketAnalysisProps {
  onBack: () => void
  marketStatus: number
}

export default function MarketAnalysis({ onBack, marketStatus }: MarketAnalysisProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [marketData, setMarketData] = useState({
    sp500: { value: 4567.89, change: 1.23 },
    nasdaq: { value: 14234.56, change: -0.87 },
    dow: { value: 34567.12, change: 0.45 },
    vix: { value: 18.45, change: -2.34 },
  })

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)

  // 市场分类
  const marketCategories = [
    {
      id: "stocks",
      name: "股票",
      icon: TrendingUp,
      color: "emerald",
      symbols: [
        { symbol: "AAPL", name: "苹果公司", price: 185.45, change: 2.1 },
        { symbol: "MSFT", name: "微软", price: 378.18, change: 1.8 },
        { symbol: "GOOGL", name: "谷歌", price: 142.56, change: -0.5 },
        { symbol: "TSLA", name: "特斯拉", price: 248.76, change: 3.2 },
        { symbol: "NVDA", name: "英伟达", price: 478.23, change: 4.5 },
        { symbol: "AMZN", name: "亚马逊", price: 155.89, change: 1.2 },
      ],
    },
    {
      id: "forex",
      name: "外汇",
      icon: BarChart3,
      color: "blue",
      symbols: [
        { symbol: "EURUSD", name: "欧元/美元", price: 1.0851, change: 0.5 },
        { symbol: "GBPUSD", name: "英镑/美元", price: 1.2734, change: -0.3 },
        { symbol: "USDJPY", name: "美元/日元", price: 149.85, change: 0.8 },
        { symbol: "USDCAD", name: "美元/加元", price: 1.3542, change: 0.2 },
        { symbol: "AUDUSD", name: "澳元/美元", price: 0.6598, change: -0.4 },
        { symbol: "USDCHF", name: "美元/瑞郎", price: 0.8756, change: 0.1 },
      ],
    },
    {
      id: "crypto",
      name: "加密货币",
      icon: Activity,
      color: "amber",
      symbols: [
        { symbol: "BTCUSD", name: "比特币", price: 43250.0, change: 2.8 },
        { symbol: "ETHUSD", name: "以太坊", price: 2580.5, change: 3.5 },
        { symbol: "BNBUSD", name: "币安币", price: 315.2, change: 1.9 },
        { symbol: "ADAUSD", name: "艾达币", price: 0.485, change: -1.2 },
        { symbol: "SOLUSD", name: "Solana", price: 98.75, change: 4.2 },
        { symbol: "DOTUSD", name: "波卡币", price: 7.85, change: -0.8 },
      ],
    },
  ]

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) => ({
        sp500: {
          value: prev.sp500.value + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 3,
        },
        nasdaq: {
          value: prev.nasdaq.value + (Math.random() - 0.5) * 50,
          change: (Math.random() - 0.5) * 3,
        },
        dow: {
          value: prev.dow.value + (Math.random() - 0.5) * 100,
          change: (Math.random() - 0.5) * 3,
        },
        vix: {
          value: Math.max(10, prev.vix.value + (Math.random() - 0.5) * 2),
          change: (Math.random() - 0.5) * 5,
        },
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {!selectedCategory ? (
        // 分类选择页面
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">市场分析</h1>
              <p className="text-slate-400 text-sm">选择您要分析的市场类别</p>
            </div>
          </div>

          {/* 主要指数概览 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MarketIndexCard
              title="S&P 500"
              value={marketData.sp500.value.toFixed(2)}
              change={marketData.sp500.change}
              icon={TrendingUp}
            />
            <MarketIndexCard
              title="NASDAQ"
              value={marketData.nasdaq.value.toFixed(2)}
              change={marketData.nasdaq.change}
              icon={BarChart3}
            />
            <MarketIndexCard
              title="Dow Jones"
              value={marketData.dow.value.toFixed(2)}
              change={marketData.dow.change}
              icon={LineChart}
            />
            <MarketIndexCard
              title="VIX"
              value={marketData.vix.value.toFixed(2)}
              change={marketData.vix.change}
              icon={Activity}
              isVix={true}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 市场分类选择 */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {marketCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Card
                      key={category.id}
                      className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r from-${category.color}-500 to-${category.color}-400 rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">{category.name}</h3>
                        <p className="text-slate-400 text-sm mb-4">{category.symbols.length} 个交易品种</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {category.symbols.slice(0, 4).map((symbol) => (
                            <div key={symbol.symbol} className="bg-slate-800/50 rounded p-2">
                              <div className="text-slate-300">{symbol.symbol}</div>
                              <div className={`${symbol.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                {symbol.change >= 0 ? "+" : ""}
                                {symbol.change}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* 右侧边栏 */}
            <div className="space-y-6">
              {/* 市场情绪 */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <TrendingUp className="mr-2 h-5 w-5 text-emerald-500" />
                    市场情绪
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">AAPL - 苹果</div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">+2.1%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">TSLA - 特斯拉</div>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/50">-1.3%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">MSFT - 微软</div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">+1.8%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">NVDA - 英伟达</div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">+3.2%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">USD/CAD</div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">1.3542</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">EUR/USD</div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">1.0851</Badge>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">市场情绪指数</div>
                      <div className="text-sm text-emerald-400">{marketStatus}%</div>
                    </div>
                    <Progress value={marketStatus} className="h-2 bg-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                        style={{ width: `${marketStatus}%` }}
                      />
                    </Progress>
                  </div>
                </CardContent>
              </Card>

              {/* 今日热门 */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <Bot className="mr-2 h-5 w-5 text-green-500" />
                    今日热门
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <HotStock symbol="NVDA" name="英伟达" price={478.23} change={5.67} volume="高" />
                    <HotStock symbol="TSLA" name="特斯拉" price={248.76} change={-2.34} volume="高" />
                    <HotStock symbol="AAPL" name="苹果" price={185.45} change={1.23} volume="中" />
                    <HotStock symbol="MSFT" name="微软" price={378.18} change={0.89} volume="中" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : !selectedSymbol ? (
        // 品种选择页面
        <>
          <div className="flex items-center justify-between">
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-slate-400 hover:text-slate-100 mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回分类选择
              </Button>
              <h1 className="text-2xl font-bold text-slate-100">
                {marketCategories.find((c) => c.id === selectedCategory)?.name}市场
              </h1>
              <p className="text-slate-400 text-sm">选择要分析的具体交易品种</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketCategories
              .find((c) => c.id === selectedCategory)
              ?.symbols.map((symbol) => (
                <Card
                  key={symbol.symbol}
                  className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedSymbol(symbol.symbol)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-100">{symbol.symbol}</h3>
                      <div className={`text-sm ${symbol.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {symbol.change >= 0 ? "+" : ""}
                        {symbol.change}%
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{symbol.name}</p>
                    <div className="text-xl font-bold text-slate-100">
                      {selectedCategory === "forex"
                        ? symbol.price.toFixed(4)
                        : selectedCategory === "crypto"
                          ? `$${symbol.price.toLocaleString()}`
                          : `$${symbol.price.toFixed(2)}`}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </>
      ) : (
        // 原有的详细分析页面
        <>
          <div className="flex items-center justify-between">
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSymbol(null)}
                className="text-slate-400 hover:text-slate-100 mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回品种选择
              </Button>
              <h1 className="text-2xl font-bold text-slate-100">{selectedSymbol} 详细分析</h1>
              <p className="text-slate-400 text-sm">深度技术分析和市场洞察</p>
            </div>
          </div>

          {/* 这里放置原有的详细分析内容 */}
          {/* 头部概览 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MarketIndexCard
              title="S&P 500"
              value={marketData.sp500.value.toFixed(2)}
              change={marketData.sp500.change}
              icon={TrendingUp}
            />
            <MarketIndexCard
              title="NASDAQ"
              value={marketData.nasdaq.value.toFixed(2)}
              change={marketData.nasdaq.change}
              icon={BarChart3}
            />
            <MarketIndexCard
              title="Dow Jones"
              value={marketData.dow.value.toFixed(2)}
              change={marketData.dow.change}
              icon={LineChart}
            />
            <MarketIndexCard
              title="VIX"
              value={marketData.vix.value.toFixed(2)}
              change={marketData.vix.change}
              icon={Activity}
              isVix={true}
            />
          </div>

          {/* 主要分析区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 技术分析 */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-emerald-500" />
                      技术分析
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {["1D", "1W", "1M", "3M", "1Y"].map((timeframe) => (
                        <Button
                          key={timeframe}
                          variant={selectedTimeframe === timeframe ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setSelectedTimeframe(timeframe)}
                          className={selectedTimeframe === timeframe ? "bg-emerald-600" : ""}
                        >
                          {timeframe}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="bg-slate-800/50 mb-4">
                      <TabsTrigger value="overview">市场概览</TabsTrigger>
                      <TabsTrigger value="sectors">板块分析</TabsTrigger>
                      <TabsTrigger value="indicators">技术指标</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                      <div className="space-y-4">
                        <TechnicalChart />
                        <div className="grid grid-cols-2 gap-4">
                          <TechnicalIndicator
                            name="RSI (14)"
                            value={67.8}
                            status="neutral"
                            description="接近超买区域"
                          />
                          <TechnicalIndicator name="MACD" value={0.45} status="bullish" description="金叉信号确认" />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="sectors">
                      <div className="space-y-3">
                        <SectorPerformance sector="科技" performance={2.34} />
                        <SectorPerformance sector="金融" performance={-0.87} />
                        <SectorPerformance sector="医疗" performance={1.23} />
                        <SectorPerformance sector="能源" performance={-1.45} />
                        <SectorPerformance sector="消费" performance={0.67} />
                      </div>
                    </TabsContent>

                    <TabsContent value="indicators">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <IndicatorCard
                          title="移动平均线"
                          ma20={4520.45}
                          ma50={4487.23}
                          ma200={4234.67}
                          current={marketData.sp500.value}
                        />
                        <IndicatorCard
                          title="支撑阻力位"
                          support={4450.0}
                          resistance={4620.0}
                          current={marketData.sp500.value}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* 市场情绪和热点 */}
            <div className="space-y-6">
              {/* 市场情绪 */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <Activity className="mr-2 h-5 w-5 text-blue-500" />
                    市场情绪
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <SentimentIndicator label="恐慌贪婪指数" value={72} status="贪婪" color="emerald" />
                    <SentimentIndicator label="看涨看跌比" value={1.34} status="中性偏多" color="blue" />
                    <SentimentIndicator label="资金流向" value={85} status="净流入" color="green" />
                  </div>
                </CardContent>
              </Card>

              {/* 热门股票 */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                    今日热门
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <HotStock symbol="NVDA" name="英伟达" price={478.23} change={5.67} volume="高" />
                    <HotStock symbol="TSLA" name="特斯拉" price={248.76} change={-2.34} volume="高" />
                    <HotStock symbol="AAPL" name="苹果" price={185.45} change={1.23} volume="中" />
                    <HotStock symbol="MSFT" name="微软" price={378.18} change={0.89} volume="中" />
                  </div>
                </CardContent>
              </Card>

              {/* AI预测 */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <Target className="mr-2 h-5 w-5 text-purple-500" />
                    AI预测
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <PredictionCard timeframe="短期 (1-3天)" prediction="震荡上行" confidence={78} target="4580-4620" />
                    <PredictionCard timeframe="中期 (1-2周)" prediction="突破上涨" confidence={65} target="4650-4720" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// 市场指数卡片
function MarketIndexCard({
  title,
  value,
  change,
  icon: Icon,
  isVix = false,
}: {
  title: string
  value: string
  change: number
  icon: any
  isVix?: boolean
}) {
  const isPositive = isVix ? change < 0 : change > 0

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-slate-400">{title}</div>
          <Icon className="h-4 w-4 text-slate-400" />
        </div>
        <div className="text-xl font-bold text-slate-100">{value}</div>
        <div className={`text-sm flex items-center ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
          {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
          {Math.abs(change).toFixed(2)}%
        </div>
      </CardContent>
    </Card>
  )
}

// 技术图表组件
function TechnicalChart() {
  return (
    <div className="h-64 bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-slate-500 text-sm">技术分析图表</div>
      </div>
      {/* 模拟K线图 */}
      <div className="absolute bottom-4 left-4 right-4 h-32 flex items-end justify-between">
        {Array.from({ length: 20 }).map((_, i) => {
          const height = Math.random() * 80 + 20
          const isGreen = Math.random() > 0.5
          return (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-2 ${isGreen ? "bg-emerald-500" : "bg-red-500"} rounded-sm`}
                style={{ height: `${height}%` }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// 技术指标组件
function TechnicalIndicator({
  name,
  value,
  status,
  description,
}: {
  name: string
  value: number
  status: "bullish" | "bearish" | "neutral"
  description: string
}) {
  const getStatusColor = () => {
    switch (status) {
      case "bullish":
        return "text-emerald-400"
      case "bearish":
        return "text-red-400"
      default:
        return "text-amber-400"
    }
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium text-slate-200">{name}</div>
        <div className={`text-sm font-mono ${getStatusColor()}`}>{value}</div>
      </div>
      <div className="text-xs text-slate-400">{description}</div>
    </div>
  )
}

// 板块表现组件
function SectorPerformance({ sector, performance }: { sector: string; performance: number }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
      <div className="text-sm text-slate-300">{sector}</div>
      <div className={`text-sm font-mono ${performance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
        {performance >= 0 ? "+" : ""}
        {performance.toFixed(2)}%
      </div>
    </div>
  )
}

// 指标卡片组件
function IndicatorCard({ title, ma20, ma50, ma200, current, support, resistance }: any) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
      <div className="text-sm font-medium text-slate-200 mb-2">{title}</div>
      <div className="space-y-1 text-xs">
        {ma20 && (
          <>
            <div className="flex justify-between">
              <span className="text-slate-400">MA20:</span>
              <span className="text-slate-300">{ma20.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">MA50:</span>
              <span className="text-slate-300">{ma50.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">MA200:</span>
              <span className="text-slate-300">{ma200.toFixed(2)}</span>
            </div>
          </>
        )}
        {support && (
          <>
            <div className="flex justify-between">
              <span className="text-slate-400">支撑:</span>
              <span className="text-green-400">{support.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">阻力:</span>
              <span className="text-red-400">{resistance.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// 情绪指标组件
function SentimentIndicator({
  label,
  value,
  status,
  color,
}: {
  label: string
  value: number
  status: string
  color: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm text-slate-400">{label}</div>
        <div className="text-sm text-slate-300">{status}</div>
      </div>
      <div className="flex items-center space-x-2">
        <Progress value={value} className="flex-1 h-2" />
        <div className={`text-xs text-${color}-400`}>{value}</div>
      </div>
    </div>
  )
}

// 热门股票组件
function HotStock({
  symbol,
  name,
  price,
  change,
  volume,
}: {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
}) {
  return (
    <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
      <div>
        <div className="text-sm font-medium text-slate-200">{symbol}</div>
        <div className="text-xs text-slate-400">{name}</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-slate-300">${price.toFixed(2)}</div>
        <div className={`text-xs ${change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </div>
      </div>
      <Badge variant="outline" className="text-xs">
        {volume}量
      </Badge>
    </div>
  )
}

// AI预测卡片
function PredictionCard({
  timeframe,
  prediction,
  confidence,
  target,
}: {
  timeframe: string
  prediction: string
  confidence: number
  target: string
}) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-slate-200">{timeframe}</div>
        <Badge variant="outline" className="text-xs">
          {confidence}%
        </Badge>
      </div>
      <div className="text-sm text-emerald-400 mb-1">{prediction}</div>
      <div className="text-xs text-slate-400">目标: {target}</div>
    </div>
  )
}
