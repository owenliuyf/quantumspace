"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  Clock,
  Eye,
  MessageSquare,
  Share2,
  Bookmark,
  Filter,
  Search,
  Zap,
  AlertCircle,
  CheckCircle,
  Star,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface FinancialNewsProps {
  onBack: () => void
}

export default function FinancialNews({ onBack }: FinancialNewsProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [newsData, setNewsData] = useState(generateNewsData())

  // 模拟新闻数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setNewsData(generateNewsData())
    }, 30000) // 30秒更新一次

    return () => clearInterval(interval)
  }, [])

  const categories = [
    { id: "all", label: "全部", count: 24 },
    { id: "market", label: "市场动态", count: 8 },
    { id: "stocks", label: "个股新闻", count: 6 },
    { id: "forex", label: "外汇", count: 4 },
    { id: "commodities", label: "大宗商品", count: 3 },
    { id: "crypto", label: "加密货币", count: 3 },
  ]

  const filteredNews = newsData.filter((news) => {
    const matchesCategory = selectedCategory === "all" || news.category === selectedCategory
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* 头部控制区 */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-2">财经新闻</h1>
          <p className="text-slate-400 text-sm">实时财经资讯与AI智能分析</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="搜索新闻..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700/50 w-64"
            />
          </div>
          <Button variant="outline" size="sm" className="border-slate-700 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </Button>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={`${
              selectedCategory === category.id ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-800"
            }`}
          >
            {category.label}
            <Badge variant="secondary" className="ml-2 text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 新闻列表 */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="latest" className="w-full">
            <TabsList className="bg-slate-800/50 mb-6">
              <TabsTrigger value="latest">最新资讯</TabsTrigger>
              <TabsTrigger value="trending">热门新闻</TabsTrigger>
              <TabsTrigger value="analysis">深度分析</TabsTrigger>
            </TabsList>

            <TabsContent value="latest" className="space-y-4">
              {filteredNews.slice(0, 8).map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </TabsContent>

            <TabsContent value="trending" className="space-y-4">
              {filteredNews
                .filter((news) => news.trending)
                .slice(0, 6)
                .map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              {filteredNews
                .filter((news) => news.type === "analysis")
                .slice(0, 5)
                .map((news) => (
                  <AnalysisCard key={news.id} news={news} />
                ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* 右侧边栏 */}
        <div className="space-y-6">
          {/* 市场快讯 */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center text-base">
                <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                市场快讯
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <FlashNews time="14:32" content="美联储官员暗示可能暂停加息" impact="positive" />
                <FlashNews time="13:45" content="NVDA盘前涨超3%，AI芯片需求强劲" impact="positive" />
                <FlashNews time="12:30" content="美元指数突破105，非美货币承压" impact="negative" />
                <FlashNews time="11:15" content="黄金价格逼近2060美元关键阻力" impact="neutral" />
              </div>
            </CardContent>
          </Card>

          {/* 热门话题 */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center text-base">
                <TrendingUp className="mr-2 h-5 w-5 text-emerald-500" />
                热门话题
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <TrendingTopic topic="#美联储政策" mentions={1234} />
                <TrendingTopic topic="#AI芯片" mentions={987} />
                <TrendingTopic topic="#黄金投资" mentions={756} />
                <TrendingTopic topic="#美元走强" mentions={543} />
                <TrendingTopic topic="#新能源汽车" mentions={432} />
              </div>
            </CardContent>
          </Card>

          {/* AI情绪分析 */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center text-base">
                <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
                AI情绪分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SentimentMeter label="整体市场情绪" value={72} sentiment="乐观" color="emerald" />
                <SentimentMeter label="新闻情绪指数" value={68} sentiment="偏乐观" color="blue" />
                <div className="pt-2 border-t border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-2">关键词云</div>
                  <div className="flex flex-wrap gap-1">
                    {["加息", "AI", "通胀", "就业", "GDP"].map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// 新闻卡片组件
function NewsCard({ news }: { news: any }) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className={`text-xs ${getCategoryColor(news.category)}`}>
                {getCategoryLabel(news.category)}
              </Badge>
              {news.trending && (
                <Badge variant="outline" className="text-xs text-red-400 border-red-500/50">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  热门
                </Badge>
              )}
              <Badge variant="outline" className={`text-xs ${getImpactColor(news.impact)}`}>
                {news.impact}影响
              </Badge>
            </div>

            <h3 className="text-lg font-semibold text-slate-100 mb-2 line-clamp-2">{news.title}</h3>

            <p className="text-slate-400 text-sm mb-3 line-clamp-2">{news.summary}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {news.time}
                </div>
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {news.views}
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {news.comments}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Bookmark className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Share2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {news.image && <div className="w-24 h-16 bg-slate-800 rounded-md flex-shrink-0"></div>}
        </div>
      </CardContent>
    </Card>
  )
}

// 深度分析卡片
function AnalysisCard({ news }: { news: any }) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-emerald-600 text-white text-xs">
              {news.analyst?.charAt(0) || "AI"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-slate-200">{news.analyst || "AI分析师"}</div>
            <div className="text-xs text-slate-500">{news.time}</div>
          </div>
          <Badge variant="outline" className="ml-auto text-xs text-purple-400 border-purple-500/50">
            深度分析
          </Badge>
        </div>

        <h3 className="text-lg font-semibold text-slate-100 mb-2">{news.title}</h3>

        <p className="text-slate-400 text-sm mb-3">{news.summary}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              准确率 {news.accuracy}%
            </Badge>
            <div className="flex items-center text-xs text-slate-500">
              <Star className="h-3 w-3 mr-1 text-yellow-500" />
              {news.rating}
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-emerald-400">
            查看详情
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// 快讯组件
function FlashNews({ time, content, impact }: { time: string; content: string; impact: string }) {
  const getImpactIcon = () => {
    switch (impact) {
      case "positive":
        return <CheckCircle className="h-3 w-3 text-emerald-500" />
      case "negative":
        return <AlertCircle className="h-3 w-3 text-red-500" />
      default:
        return <Clock className="h-3 w-3 text-slate-500" />
    }
  }

  return (
    <div className="flex items-start space-x-2 p-2 bg-slate-800/30 rounded">
      {getImpactIcon()}
      <div className="flex-1">
        <div className="text-xs text-slate-500 mb-1">{time}</div>
        <div className="text-sm text-slate-300">{content}</div>
      </div>
    </div>
  )
}

// 热门话题组件
function TrendingTopic({ topic, mentions }: { topic: string; mentions: number }) {
  return (
    <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded hover:bg-slate-800/50 cursor-pointer">
      <div className="text-sm text-slate-300">{topic}</div>
      <div className="text-xs text-slate-500">{mentions.toLocaleString()}</div>
    </div>
  )
}

// 情绪指标组件
function SentimentMeter({
  label,
  value,
  sentiment,
  color,
}: {
  label: string
  value: number
  sentiment: string
  color: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm text-slate-400">{label}</div>
        <div className="text-sm text-slate-300">{sentiment}</div>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full bg-gradient-to-r from-${color}-500 to-${color}-400`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="text-xs text-slate-500 mt-1">{value}/100</div>
    </div>
  )
}

// 辅助函数
function getCategoryColor(category: string) {
  const colors = {
    market: "text-blue-400 border-blue-500/50",
    stocks: "text-emerald-400 border-emerald-500/50",
    forex: "text-purple-400 border-purple-500/50",
    commodities: "text-amber-400 border-amber-500/50",
    crypto: "text-orange-400 border-orange-500/50",
  }
  return colors[category as keyof typeof colors] || "text-slate-400 border-slate-500/50"
}

function getCategoryLabel(category: string) {
  const labels = {
    market: "市场",
    stocks: "个股",
    forex: "外汇",
    commodities: "商品",
    crypto: "加密",
  }
  return labels[category as keyof typeof labels] || "其他"
}

function getImpactColor(impact: string) {
  const colors = {
    高: "text-red-400 border-red-500/50",
    中: "text-amber-400 border-amber-500/50",
    低: "text-green-400 border-green-500/50",
  }
  return colors[impact as keyof typeof colors] || "text-slate-400 border-slate-500/50"
}

// 生成模拟新闻数据
function generateNewsData() {
  return [
    {
      id: 1,
      title: "美联储暗示可能暂停加息，美股三大指数集体上涨",
      summary: "美联储官员表示通胀压力有所缓解，市场预期加息周期接近尾声，科技股领涨。",
      category: "market",
      impact: "高",
      time: "2小时前",
      views: "12.3K",
      comments: 45,
      trending: true,
      type: "news",
      image: true,
    },
    {
      id: 2,
      title: "NVIDIA财报超预期，AI芯片需求持续强劲",
      summary: "NVIDIA第四季度营收达到创纪录的221亿美元，数据中心业务增长409%。",
      category: "stocks",
      impact: "高",
      time: "3小时前",
      views: "8.7K",
      comments: 32,
      trending: true,
      type: "news",
      image: true,
    },
    {
      id: 3,
      title: "黄金价格突破2050美元，避险情绪升温",
      summary: "地缘政治紧张局势推高避险需求，黄金价格创近期新高，技术面显示进一步上涨空间。",
      category: "commodities",
      impact: "中",
      time: "4小时前",
      views: "6.2K",
      comments: 28,
      trending: false,
      type: "analysis",
      analyst: "张明华",
      accuracy: 85,
      rating: 4.2,
    },
    {
      id: 4,
      title: "美元指数走强，非美货币普遍承压",
      summary: "美国经济数据强劲，美元指数上涨至105上方，欧元、英镑等主要货币下跌。",
      category: "forex",
      impact: "高",
      time: "5小时前",
      views: "5.4K",
      comments: 19,
      trending: false,
      type: "news",
    },
    {
      id: 5,
      title: "特斯拉Q4交付量超预期，股价盘后大涨",
      summary: "特斯拉第四季度交付量达到48.4万辆，超出市场预期，全年交付量增长35%。",
      category: "stocks",
      impact: "中",
      time: "6小时前",
      views: "4.8K",
      comments: 24,
      trending: false,
      type: "news",
      image: true,
    },
  ]
}
