import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Brain, Lightbulb, Users, ArrowRight, CheckCircle } from 'lucide-react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (email) {
      setIsLoading(true)
      try {
        const res = await fetch("https://beehiiv-subscribe-proxy.obvy-ai.workers.dev", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })
        const data = await res.json()
        if (res.ok && data.success) {
          setIsSubmitted(true)
        } else {
          setError(data.error || "Something went wrong. Please try again.")
        }
      } catch {
        setError("Network error. Please try again.")
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-8 min-h-screen flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-blue-500/30">
            <Brain className="w-4 h-4" />
            Launching September 2025
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            You're smarter than your AI.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-2">
            Learn better by being the smartest in the room. With Obvy, you're not just a student, you're a teacher. 
            Our AI study partner is designed to be a little… slow. It's up to you to explain concepts, answer questions, 
            and guide it to the right conclusions.
          </p>
          
          <p className="text-lg text-blue-300 font-medium">
            In the process, you'll master any topic without even realizing it.
          </p>
        </div>

        {/* Waitlist form */}
        <div className="max-w-md mx-auto w-full mb-22">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-6 text-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl backdrop-blur-sm focus:bg-white/15 focus:border-blue-400 transition-all duration-300"
                  required
                />
              </div>
              
              {error && (
                <div className="text-red-400 text-sm text-center p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full py-6 text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  "Joining..."
                ) : (
                  <>
                    Join the waitlist
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center p-8 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-green-300 mb-2">You're on the list!</h3>
              <p className="text-gray-300">We'll notify you when Obvy is ready to make you the smartest person in the room.</p>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Be the Expert</h3>
            <p className="text-gray-400">
              With Obvy, you're always the one with the answers. Build confidence as you teach and guide your AI study partner.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Study Partners Who Don't Judge</h3>
            <p className="text-gray-400">
              No more feeling stupid in study groups. Obvy is designed to make you feel smart, not intimidated.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Learn by Teaching</h3>
            <p className="text-gray-400">
              The best way to learn is to teach. Explain concepts to Obvy and watch your understanding deepen.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            How it works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2">Choose your topic</h3>
              <p className="text-gray-400 text-sm">From quantum physics to Shakespeare, Obvy is ready to learn anything.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2">Start the conversation</h3>
              <p className="text-gray-400 text-sm">Ask Obvy a question, and it'll ask you one back. And another. And another.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2">Watch your confidence soar</h3>
              <p className="text-gray-400 text-sm">With Obvy, you're the expert. You're the one with all the answers.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p className="text-sm">
            Join thousands of learners who are ready to flip the script on traditional studying.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

