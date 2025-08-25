"use client"

import { useEffect, useState, useRef } from "react"
import {
  BarChart3,
  Bell,
  Bot,
  Brain,
  Briefcase,
  Building2,
  Download,
  Info,
  TrendingUp,
  Users,
  Shield,
  SettingsIcon,
  Newspaper,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import QuantumAgentView from "./quantum-agent"
import MarketAnalysis from "./market-analysis"
import FinancialNews from "./financial-news"
import PortfolioManagement from "./portfolio-management"
import AnalystViews from "./analyst-views"
import RiskManagement from "./risk-management"
import Settings from "./settings"

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [marketStatus, setMarketStatus] = useState(85)
  const [portfolioValue, setPortfolioValue] = useState(125000)
  const [dailyChange, setDailyChange] = useState(2.34)
  const [aiConfidence, setAiConfidence] = useState(92)
  const [riskLevel, setRiskLevel] = useState(35)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [currentView, setCurrentView] = useState<
    | "dashboard"
    | "quantum-agent"
    | "market-analysis"
    | "financial-news"
    | "portfolio-management"
    | "analyst-views"
    | "risk-management"
    | "settings"
  >("dashboard")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // 更新时间
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // 模拟数据变化
  useEffect(() => {
    const interval = setInterval(() => {
      setDailyChange((Math.random() - 0.5) * 5)
      setAiConfidence(Math.floor(Math.random() * 15) + 85)
      setRiskLevel(Math.floor(Math.random() * 20) + 25)
      setPortfolioValue(125000 + (Math.random() - 0.5) * 50000)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // 粒子效果
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 80

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.color = `rgba(${Math.floor(Math.random() * 50) + 50}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 50) + 50}, ${Math.random() * 0.4 + 0.1})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // 切换主题
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // 格式化时间
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // 格式化日期
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // 格式化货币 - 改为美元
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // 渲染当前视图的主要内容
  const renderMainContent = () => {
    switch (currentView) {
      case "quantum-agent":
        return <QuantumAgentView onBack={() => setCurrentView("dashboard")} />
      case "market-analysis":
        return <MarketAnalysis onBack={() => setCurrentView("dashboard")} marketStatus={marketStatus} />
      case "financial-news":
        return <FinancialNews onBack={() => setCurrentView("dashboard")} />
      case "portfolio-management":
        return <PortfolioManagement onBack={() => setCurrentView("dashboard")} />
      case "analyst-views":
        return <AnalystViews onBack={() => setCurrentView("dashboard")} />
      case "risk-management":
        return <RiskManagement onBack={() => setCurrentView("dashboard")} />
      case "settings":
        return <Settings onBack={() => setCurrentView("dashboard")} />
      default:
        return renderDashboardContent()
    }
  }

  // 渲染主仪表板内容
  const renderDashboardContent = () => (
    <div className="grid gap-6">
      {/* 投资组合概览 */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-slate-700/50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-emerald-500" />
              投资组合概览
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-slate-800/50 text-emerald-400 border-emerald-500/50 text-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></div>
                实时
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="总资产"
              value={formatCurrency(portfolioValue)}
              icon={Building2}
              trend={dailyChange > 0 ? "up" : "down"}
              color="emerald"
              detail={`今日${dailyChange > 0 ? "+" : ""}${dailyChange.toFixed(2)}%`}
              isValue={true}
            />
            <MetricCard
              title="AI信心指数"
              value={aiConfidence}
              icon={Brain}
              trend="up"
              color="green"
              detail="基于深度学习模型"
            />
            <MetricCard
              title="风险评级"
              value={riskLevel}
              icon={Info}
              trend="stable"
              color="amber"
              detail="中等风险水平"
            />
          </div>

          <div className="mt-8">
            <Tabs defaultValue="performance" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-slate-800/50 p-1">
                  <TabsTrigger
                    value="performance"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-emerald-400"
                  >
                    业绩表现
                  </TabsTrigger>
                  <TabsTrigger
                    value="holdings"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-emerald-400"
                  >
                    持仓分析
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai-insights"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-emerald-400"
                  >
                    AI洞察
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1"></div>
                    收益
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                    基准
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
                    风险
                  </div>
                </div>
              </div>

              <TabsContent value="performance" className="mt-0">
                <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                  <PerformanceChart />
                  <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                    <div className="text-xs text-slate-400">年化收益率</div>
                    <div className="text-lg font-mono text-emerald-400">+12.8%</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="holdings" className="mt-0">
                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                  <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                    <div className="col-span-3">股票代码</div>
                    <div className="col-span-3">公司名称</div>
                    <div className="col-span-2">持仓比例</div>
                    <div className="col-span-2">当前价格</div>
                    <div className="col-span-2">涨跌幅</div>
                  </div>

                  <div className="divide-y divide-slate-700/30">
                    <HoldingRow code="AAPL" name="苹果公司" percentage={15.2} price={185.45} change={2.1} />
                    <HoldingRow code="TSLA" name="特斯拉" percentage={12.8} price={248.76} change={-1.3} />
                    <HoldingRow code="MSFT" name="微软" percentage={11.5} price={378.18} change={1.8} />
                    <HoldingRow code="EURUSD" name="欧元/美元" percentage={10.3} price={1.085} change={0.5} />
                    <HoldingRow code="GOLD" name="黄金现货" percentage={8.7} price={2058.32} change={-0.8} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai-insights" className="mt-0">
                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                  <div className="space-y-4">
                    <AIInsightCard
                      title="市场趋势预测"
                      confidence={92}
                      insight="基于技术分析和基本面分析，预计未来30天市场将呈现震荡上行趋势，建议适度增加科技股配置。"
                      type="bullish"
                    />
                    <AIInsightCard
                      title="风险提醒"
                      confidence={85}
                      insight="检测到您的投资组合在金融板块配置过重，建议分散投资以降低系统性风险。"
                      type="warning"
                    />
                    <AIInsightCard
                      title="机会识别"
                      confidence={78}
                      insight="新能源板块近期调整充分，技术指标显示超跌反弹信号，可关注龙头企业投资机会。"
                      type="opportunity"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* 市场分析 & AI助手 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <TrendingUp className="mr-2 h-5 w-5 text-emerald-500" />
              市场热点
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

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <Bot className="mr-2 h-5 w-5 text-green-500" />
              AI助手建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <AlertItem
                title="买入建议"
                time="14:32"
                description="检测到AAPL技术面突破，建议适量买入"
                type="success"
              />
              <AlertItem
                title="风险提醒"
                time="13:45"
                description="您的科技股仓位过重，建议适当分散投资"
                type="warning"
              />
              <AlertItem title="外汇机会" time="09:12" description="EURUSD出现超跌反弹信号，关注做多机会" type="info" />
              <AlertItem
                title="黄金提醒"
                time="08:30"
                description="黄金价格接近关键阻力位，注意获利了结"
                type="update"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 新闻分析 */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-base">
            <Info className="mr-2 h-5 w-5 text-blue-500" />
            智能新闻分析
          </CardTitle>
          <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
            4条新消息
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <NewsItem
              title="美联储暗示可能暂停加息，美股三大指数集体上涨"
              time="15:42"
              sentiment="positive"
              impact="高"
              summary="美联储官员表示通胀压力有所缓解，市场预期加息周期接近尾声，科技股领涨。"
              unread
            />
            <NewsItem
              title="黄金价格突破2050美元，避险情绪升温"
              time="14:30"
              sentiment="positive"
              impact="中"
              summary="地缘政治紧张局势推高避险需求，黄金价格创近期新高。"
              unread
            />
            <NewsItem
              title="美元指数走强，非美货币普遍承压"
              time="12:15"
              sentiment="negative"
              impact="高"
              summary="美国经济数据强劲，美元指数上涨，欧元、英镑等主要货币下跌。"
              unread
            />
            <NewsItem
              title="特斯拉Q4交付量超预期，股价盘后大涨"
              time="09:05"
              sentiment="positive"
              impact="中"
              summary="特斯拉第四季度交付量达到48.4万辆，超出市场预期，股价盘后涨幅超过5%。"
              unread
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-700/50 pt-4">
          <div className="flex items-center w-full space-x-2">
            <input
              type="text"
              placeholder="询问AI关于市场的问题..."
              className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="h-4 w-4" />
            </Button>
            <Button size="icon" className="bg-green-600 hover:bg-green-700">
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950 text-slate-100 relative overflow-hidden`}
    >
      {/* 背景粒子效果 */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20" />

      {/* 加载覆盖层 */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-green-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-emerald-400 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-400 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-emerald-400 font-mono text-sm tracking-wider">量子空间初始化中...</div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        {/* 头部 */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            {/* 请将您的logo图片保存到public文件夹，然后告诉我文件名 */}
            <img src="/your-logo.png" alt="Logo" className="h-8" />
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Download className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="搜索股票、外汇、黄金..."
                className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>通知</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="text-slate-400 hover:text-slate-100"
                    >
                      {theme === "dark" ? <Download className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>切换主题</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="用户" />
                <AvatarFallback className="bg-slate-700 text-emerald-400">量子</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* 主要布局 */}
        <div className="grid grid-cols-12 gap-6">
          {/* 左侧边栏 - 始终显示 */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem
                    icon={BarChart3}
                    label="投资总览"
                    active={currentView === "dashboard"}
                    onClick={() => setCurrentView("dashboard")}
                  />
                  <NavItem
                    icon={Bot}
                    label="Quantum Agent"
                    active={currentView === "quantum-agent"}
                    onClick={() => setCurrentView("quantum-agent")}
                  />
                  <NavItem
                    icon={TrendingUp}
                    label="市场分析"
                    active={currentView === "market-analysis"}
                    onClick={() => setCurrentView("market-analysis")}
                  />
                  <NavItem
                    icon={Newspaper}
                    label="财经新闻"
                    active={currentView === "financial-news"}
                    onClick={() => setCurrentView("financial-news")}
                  />
                  <NavItem
                    icon={Briefcase}
                    label="投资组合"
                    active={currentView === "portfolio-management"}
                    onClick={() => setCurrentView("portfolio-management")}
                  />
                  <NavItem
                    icon={Users}
                    label="分析师观点"
                    active={currentView === "analyst-views"}
                    onClick={() => setCurrentView("analyst-views")}
                  />
                  <NavItem
                    icon={Shield}
                    label="风险管理"
                    active={currentView === "risk-management"}
                    onClick={() => setCurrentView("risk-management")}
                  />
                  <NavItem
                    icon={SettingsIcon}
                    label="设置"
                    active={currentView === "settings"}
                    onClick={() => setCurrentView("settings")}
                  />
                </nav>

                {currentView === "dashboard" && (
                  <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-2 font-mono">市场状态</div>
                    <div className="space-y-3">
                      <StatusItem label="市场情绪" value={marketStatus} color="emerald" />
                      <StatusItem label="AI信心指数" value={aiConfidence} color="green" />
                      <StatusItem label="风险水平" value={riskLevel} color="amber" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 主要内容区域 */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">{renderMainContent()}</div>
        </div>
      </div>
    </div>
  )
}

// 导航项组件
function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: { icon: any; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-emerald-400" : "text-slate-400 hover:text-slate-100"}`}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// 状态项组件
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "emerald":
        return "from-emerald-500 to-green-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "amber":
        return "from-amber-500 to-orange-500"
      default:
        return "from-emerald-500 to-green-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

// 指标卡片组件
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  isValue = false,
}: {
  title: string
  value: number | string
  icon: any
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  isValue?: boolean
}) {
  const getColor = () => {
    switch (color) {
      case "emerald":
        return "from-emerald-500 to-green-500 border-emerald-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "amber":
        return "from-amber-500 to-orange-500 border-amber-500/30"
      default:
        return "from-emerald-500 to-green-500 border-emerald-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <Download className="h-4 w-4 text-emerald-500" />
      case "down":
        return <Download className="h-4 w-4 text-red-500" />
      case "stable":
        return <Download className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {isValue ? value : `${value}%`}
      </div>
      <div className="text-xs text-slate-400">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
    </div>
  )
}

// 性能图表组件
function PerformanceChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y轴标签 */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">20%</div>
        <div className="text-xs text-slate-500">15%</div>
        <div className="text-xs text-slate-500">10%</div>
        <div className="text-xs text-slate-500">5%</div>
        <div className="text-xs text-slate-500">0%</div>
      </div>

      {/* X轴网格线 */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      {/* 图表柱状图 */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 30 }).map((_, i) => {
          const portfolioHeight = Math.floor(Math.random() * 40) + 40
          const benchmarkHeight = Math.floor(Math.random() * 30) + 35
          const riskHeight = Math.floor(Math.random() * 20) + 10

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className="w-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-sm"
                style={{ height: `${portfolioHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm"
                style={{ height: `${benchmarkHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-sm"
                style={{ height: `${riskHeight}%` }}
              ></div>
            </div>
          )
        })}
      </div>

      {/* X轴标签 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-slate-500">1月</div>
        <div className="text-xs text-slate-500">3月</div>
        <div className="text-xs text-slate-500">6月</div>
        <div className="text-xs text-slate-500">9月</div>
        <div className="text-xs text-slate-500">12月</div>
      </div>
    </div>
  )
}

// 持仓行组件
function HoldingRow({
  code,
  name,
  percentage,
  price,
  change,
}: {
  code: string
  name: string
  percentage: number
  price: number
  change: number
}) {
  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-3 text-slate-300">{code}</div>
      <div className="col-span-3 text-slate-300">{name}</div>
      <div className="col-span-2 text-emerald-400">{percentage}%</div>
      <div className="col-span-2 text-slate-400">¥{price}</div>
      <div className="col-span-2">
        <span className={change >= 0 ? "text-emerald-400" : "text-red-400"}>
          {change >= 0 ? "+" : ""}
          {change}%
        </span>
      </div>
    </div>
  )
}

// AI洞察卡片组件
function AIInsightCard({
  title,
  confidence,
  insight,
  type,
}: {
  title: string
  confidence: number
  insight: string
  type: "bullish" | "warning" | "opportunity"
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "bullish":
        return { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", icon: Download }
      case "warning":
        return { color: "text-amber-400 bg-amber-500/10 border-amber-500/30", icon: Download }
      case "opportunity":
        return { color: "text-blue-400 bg-blue-500/10 border-blue-500/30", icon: Download }
      default:
        return { color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", icon: Download }
    }
  }

  const { color, icon: Icon } = getTypeStyles()

  return (
    <div className={`bg-slate-800/50 rounded-md p-3 border ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Icon className={`h-4 w-4 mr-2 ${color.split(" ")[0]}`} />
          <div className="text-sm font-medium text-slate-200">{title}</div>
        </div>
        <Badge variant="outline" className={`${color.split(" ")[1]} ${color.split(" ")[0]} border-current text-xs`}>
          {confidence}% 信心
        </Badge>
      </div>
      <div className="text-xs text-slate-400">{insight}</div>
    </div>
  )
}

// 警报项组件
function AlertItem({
  title,
  time,
  description,
  type,
}: {
  title: string
  time: string
  description: string
  type: "info" | "warning" | "error" | "success" | "update"
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "info":
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
      case "warning":
        return { icon: Download, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
      case "error":
        return { icon: Download, color: "text-red-500 bg-red-500/10 border-red-500/30" }
      case "success":
        return { icon: Download, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30" }
      case "update":
        return { icon: Download, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30" }
      default:
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
    }
  }

  const { icon: Icon, color } = getTypeStyles()

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
        <Icon className={`h-3 w-3 ${color.split(" ")[0]}`} />
      </div>
      <div>
        <div className="flex items-center">
          <div className="text-sm font-medium text-slate-200">{title}</div>
          <div className="ml-2 text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400">{description}</div>
      </div>
    </div>
  )
}

// 新闻项组件
function NewsItem({
  title,
  time,
  sentiment,
  impact,
  summary,
  unread,
}: {
  title: string
  time: string
  sentiment: "positive" | "negative" | "neutral"
  impact: string
  summary: string
  unread?: boolean
}) {
  const getSentimentColor = () => {
    switch (sentiment) {
      case "positive":
        return "text-emerald-400"
      case "negative":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <div className={`p-3 rounded-md ${unread ? "bg-slate-800/50 border border-slate-700/50" : ""}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="text-sm font-medium text-slate-200 flex-1">{title}</div>
        <div className="flex items-center space-x-2 ml-2">
          <Badge variant="outline" className={`${getSentimentColor()} border-current text-xs`}>
            {impact}影响
          </Badge>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
      </div>
      <div className="text-xs text-slate-400">{summary}</div>
      {unread && (
        <div className="flex justify-end mt-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
        </div>
      )}
    </div>
  )
}