"use client"

import { useState } from "react"
import { ArrowLeft, User, Bell, Shield, Palette, CreditCard, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SettingsProps {
  onBack: () => void
}

export default function Settings({ onBack }: SettingsProps) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    trading: true,
    news: true,
    analysis: false,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    sharePerformance: true,
    dataCollection: true,
  })

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div>
        <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-400 hover:text-slate-100 mb-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回总览
        </Button>
        <h1 className="text-2xl font-bold text-slate-100">设置</h1>
        <p className="text-slate-400 text-sm">管理您的账户和应用偏好设置</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-slate-800/50">
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="preferences">偏好设置</TabsTrigger>
          <TabsTrigger value="billing">账单管理</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center">
                <User className="mr-2 h-5 w-5 text-emerald-500" />
                个人信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="用户头像" />
                  <AvatarFallback className="bg-emerald-600 text-white text-xl">量</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="mb-2 bg-transparent">
                    更换头像
                  </Button>
                  <p className="text-sm text-slate-400">支持 JPG, PNG 格式，最大 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-slate-300">
                    姓名
                  </Label>
                  <Input id="name" defaultValue="量子用户" className="bg-slate-800 border-slate-700 mt-1" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300">
                    邮箱
                  </Label>
                  <Input id="email" defaultValue="user@quantum.ai" className="bg-slate-800 border-slate-700 mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-300">
                    手机号
                  </Label>
                  <Input id="phone" defaultValue="+86 138****8888" className="bg-slate-800 border-slate-700 mt-1" />
                </div>
                <div>
                  <Label htmlFor="location" className="text-slate-300">
                    所在地区
                  </Label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-300 mt-1">
                    <option value="cn">中国大陆</option>
                    <option value="hk">香港</option>
                    <option value="us">美国</option>
                    <option value="sg">新加坡</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">保存更改</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center">
                <Bell className="mr-2 h-5 w-5 text-blue-500" />
                通知偏好
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-4">通知方式</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">邮件通知</Label>
                        <p className="text-sm text-slate-500">接收重要更新和报告</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">推送通知</Label>
                        <p className="text-sm text-slate-500">实时市场提醒</p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">短信通知</Label>
                        <p className="text-sm text-slate-500">紧急风险提醒</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-6">
                  <h3 className="text-lg font-medium text-slate-200 mb-4">通知内容</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">交易提醒</Label>
                        <p className="text-sm text-slate-500">买卖信号和执行确认</p>
                      </div>
                      <Switch
                        checked={notifications.trading}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, trading: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">新闻资讯</Label>
                        <p className="text-sm text-slate-500">重要财经新闻推送</p>
                      </div>
                      <Switch
                        checked={notifications.news}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, news: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">分析师观点</Label>
                        <p className="text-sm text-slate-500">专业分析和建议</p>
                      </div>
                      <Switch
                        checked={notifications.analysis}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, analysis: checked })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-green-500" />
                安全设置
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-4">密码安全</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password" className="text-slate-300">
                        当前密码
                      </Label>
                      <Input id="current-password" type="password" className="bg-slate-800 border-slate-700 mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="new-password" className="text-slate-300">
                        新密码
                      </Label>
                      <Input id="new-password" type="password" className="bg-slate-800 border-slate-700 mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password" className="text-slate-300">
                        确认新密码
                      </Label>
                      <Input id="confirm-password" type="password" className="bg-slate-800 border-slate-700 mt-1" />
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">更新密码</Button>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-6">
                  <h3 className="text-lg font-medium text-slate-200 mb-4">两步验证</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">短信验证</Label>
                        <p className="text-sm text-slate-500">登录时发送验证码到手机</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">邮箱验证</Label>
                        <p className="text-sm text-slate-500">重要操作时邮箱确认</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-6">
                  <h3 className="text-lg font-medium text-slate-200 mb-4">隐私设置</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">公开个人资料</Label>
                        <p className="text-sm text-slate-500">允许其他用户查看您的资料</p>
                      </div>
                      <Switch
                        checked={privacy.profilePublic}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, profilePublic: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">分享投资表现</Label>
                        <p className="text-sm text-slate-500">在社区中展示您的投资成果</p>
                      </div>
                      <Switch
                        checked={privacy.sharePerformance}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, sharePerformance: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">数据收集</Label>
                        <p className="text-sm text-slate-500">允许收集使用数据以改善服务</p>
                      </div>
                      <Switch
                        checked={privacy.dataCollection}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, dataCollection: checked })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center">
                <Palette className="mr-2 h-5 w-5 text-purple-500" />
                界面偏好
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="text-slate-300 mb-2 block">主题模式</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                      <div className="w-8 h-8 bg-slate-800 rounded mb-2"></div>
                      <span className="text-xs">深色</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                      <div className="w-8 h-8 bg-slate-200 rounded mb-2"></div>
                      <span className="text-xs">浅色</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                      <div className="w-8 h-8 bg-gradient-to-r from-slate-800 to-slate-200 rounded mb-2"></div>
                      <span className="text-xs">自动</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block">语言设置</Label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-300">
                    <option value="zh-CN">简体中文</option>
                    <option value="zh-TW">繁体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                  </select>
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block">时区设置</Label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-300">
                    <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
                    <option value="Asia/Hong_Kong">香港时间 (UTC+8)</option>
                    <option value="America/New_York">纽约时间 (UTC-5)</option>
                    <option value="Europe/London">伦敦时间 (UTC+0)</option>
                  </select>
                </div>

                <div>
                  <Label className="text-slate-300 mb-2 block">货币显示</Label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-300">
                    <option value="USD">美元 (USD)</option>
                    <option value="CNY">人民币 (CNY)</option>
                    <option value="HKD">港币 (HKD)</option>
                    <option value="EUR">欧元 (EUR)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-amber-500" />
                订阅管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-slate-200">专业版</h3>
                    <span className="text-emerald-400 text-sm">当前计划</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">享受完整的AI投资分析功能</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-100">$99/月</span>
                    <Button variant="outline">管理订阅</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-4">账单历史</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded">
                      <div>
                        <div className="text-slate-300">2024年1月</div>
                        <div className="text-sm text-slate-500">专业版订阅</div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-300">$99.00</div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          下载
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded">
                      <div>
                        <div className="text-slate-300">2023年12月</div>
                        <div className="text-sm text-slate-500">专业版订阅</div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-300">$99.00</div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          下载
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-4">支付方式</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-6 bg-blue-600 rounded mr-3"></div>
                        <div>
                          <div className="text-slate-300">**** **** **** 1234</div>
                          <div className="text-sm text-slate-500">过期时间: 12/26</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        编辑
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      + 添加支付方式
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
