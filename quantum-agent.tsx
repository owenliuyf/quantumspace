"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, Mic, Paperclip, MoreHorizontal, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface QuantumAgentViewProps {
  onBack: () => void
}

export default function QuantumAgentView({ onBack }: QuantumAgentViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 历史对话记录
  const [chatHistory] = useState([
    { id: "1", title: "投资组合风险分析", time: "2小时前" },
    { id: "2", title: "AAPL股票分析", time: "昨天" },
    { id: "3", title: "外汇市场趋势", time: "3天前" },
    { id: "4", title: "黄金投资建议", time: "1周前" },
    { id: "5", title: "市场情绪分析", time: "1周前" },
  ])

  // 示例对话气泡
  const exampleQuestions = [
    "我现在的投资组合风险高吗？",
    "AAPL的技术分析如何？",
    "今天的市场情绪怎么样？",
    "EUR/USD的走势预测",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (question: string): string => {
    if (question.includes("风险")) {
      return "根据您当前的投资组合分析，风险水平为中等（35%）。您的科技股配置占比较高（约40%），建议适当分散投资到其他板块以降低集中度风险。当前的止损设置为-8%，这是一个合理的风险控制水平。"
    } else if (question.includes("AAPL") || question.includes("苹果")) {
      return "AAPL当前价格$185.45，技术面显示突破关键阻力位，RSI指标为65，处于健康上升趋势。基本面方面，iPhone 15销量超预期，服务业务持续增长。分析师平均目标价$200，建议适量配置。"
    } else if (question.includes("市场情绪")) {
      return "当前市场情绪指数为85%，处于乐观区间。主要驱动因素包括：1）美联储暂停加息预期 2）科技股财报表现良好 3）经济数据显示韧性。建议保持谨慎乐观，关注风险管理。"
    } else if (question.includes("EUR/USD") || question.includes("欧元")) {
      return "EUR/USD当前交易于1.0851，技术面显示在1.08-1.09区间震荡。欧央行政策分化和美国经济数据是主要影响因素。短期阻力位1.0900，支撑位1.0800。建议区间交易策略。"
    } else {
      return "我是Quantum Agent，您的AI投资助手。我可以帮您分析投资组合、解读市场趋势、提供交易建议。请告诉我您想了解什么具体信息，我会基于实时数据和AI模型为您提供专业分析。"
    }
  }

  const handleExampleClick = (question: string) => {
    handleSendMessage(question)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="h-[calc(100vh-120px)] flex">
      {/* 左侧历史对话 */}
      <div className="w-80 border-r border-slate-700/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="p-4 border-b border-slate-700/50">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-400 hover:text-slate-100 mb-3">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回总览
          </Button>
          <h3 className="text-lg font-semibold text-slate-100">对话历史</h3>
        </div>

        <div className="p-2">
          <Button
            variant="outline"
            className="w-full mb-4 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
            onClick={() => setMessages([])}
          >
            + 新对话
          </Button>

          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className="p-3 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-300 truncate flex-1">{chat.title}</div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500 mt-1">{chat.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧对话区域 */}
      <div className="flex-1 flex flex-col relative">
        {/* 对话内容 - 移除头部，直接从对话内容开始 */}
        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-2">
                  Quantum Agent
                </h2>
                <p className="text-sm text-slate-400">选择下面的示例问题，或者直接输入您的问题</p>
              </div>

              <div className="grid grid-cols-2 gap-2 max-w-xl">
                {exampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="p-4 h-auto text-left border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 hover:border-emerald-500/50"
                    onClick={() => handleExampleClick(question)}
                  >
                    <div className="text-sm text-slate-300">{question}</div>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                    <Avatar className="h-8 w-8 mx-2">
                      {message.isUser ? (
                        <AvatarFallback className="bg-slate-700 text-emerald-400">您</AvatarFallback>
                      ) : (
                        <AvatarFallback className="bg-emerald-600 text-white">AI</AvatarFallback>
                      )}
                    </Avatar>

                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.isUser
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-800/50 text-slate-100 border border-slate-700/50"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className={`text-xs mt-2 ${message.isUser ? "text-emerald-100" : "text-slate-500"}`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex">
                    <Avatar className="h-8 w-8 mx-2">
                      <AvatarFallback className="bg-emerald-600 text-white">AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* 输入框 - 固定在底部，完全贴合边缘 */}
        <div className="absolute bottom-4 left-4 right-0 border border-slate-700/50 bg-slate-900/30 backdrop-blur-md rounded-2xl">
          <div className="flex items-end space-x-2 w-full p-4">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(inputValue)
                  }
                }}
                placeholder="输入您的问题..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2 pr-12 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 resize-none backdrop-blur-sm"
                disabled={isTyping}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-slate-400 hover:text-slate-100"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 text-slate-400 hover:text-slate-100 flex-shrink-0"
            >
              <Mic className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="h-10 w-10 p-0 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-slate-500 text-center px-4 pb-3">Quantum Agent可能会出错。请验证重要信息。</div>
        </div>
      </div>
    </div>
  )
}
