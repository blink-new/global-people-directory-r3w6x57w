import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, X, Save, Upload, Calendar, MapPin, ExternalLink, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

interface CareerEntry {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  description: string
}

interface EducationEntry {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface AchievementEntry {
  id: string
  title: string
  organization: string
  date: string
  description: string
}

export default function ProfileEdit() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Profile state
  const [profile, setProfile] = useState({
    name: 'Sarah Chen',
    profession: 'AI Research Scientist',
    location: 'San Francisco, CA, USA',
    bio: 'Passionate AI researcher with 8+ years of experience in machine learning and neural networks. Currently leading breakthrough research in natural language processing at a top tech company.',
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://sarahchen.ai',
    linkedin: 'https://linkedin.com/in/sarahchen',
    twitter: 'https://twitter.com/sarahchen_ai',
    avatar: '/placeholder-avatar-1.jpg'
  })

  const [skills, setSkills] = useState(['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Python', 'TensorFlow', 'Research', 'AI Ethics'])
  const [newSkill, setNewSkill] = useState('')

  const [career, setCareer] = useState<CareerEntry[]>([
    {
      id: '1',
      title: 'Senior AI Research Scientist',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: null,
      description: 'Leading a team of 8 researchers working on next-generation NLP models. Developed breakthrough algorithms that improved model accuracy by 23%.'
    }
  ])

  const [education, setEducation] = useState<EducationEntry[]>([
    {
      id: '1',
      degree: 'Ph.D. in Computer Science',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2012-09',
      endDate: '2016-06',
      description: 'Dissertation: "Advanced Neural Architectures for Natural Language Understanding"'
    }
  ])

  const [achievements, setAchievements] = useState<AchievementEntry[]>([
    {
      id: '1',
      title: 'Best Paper Award',
      organization: 'NeurIPS 2023',
      date: '2023-12',
      description: 'Recognized for groundbreaking work in transformer architectures'
    }
  ])

  const [isCareerDialogOpen, setIsCareerDialogOpen] = useState(false)
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false)
  const [isAchievementDialogOpen, setIsAchievementDialogOpen] = useState(false)
  const [editingCareer, setEditingCareer] = useState<CareerEntry | null>(null)
  const [editingEducation, setEditingEducation] = useState<EducationEntry | null>(null)
  const [editingAchievement, setEditingAchievement] = useState<AchievementEntry | null>(null)

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove))
  }

  const handleSaveCareer = (careerData: Omit<CareerEntry, 'id'>) => {
    if (editingCareer) {
      setCareer(prev => prev.map(item => 
        item.id === editingCareer.id ? { ...careerData, id: editingCareer.id } : item
      ))
    } else {
      setCareer(prev => [...prev, { ...careerData, id: Date.now().toString() }])
    }
    setIsCareerDialogOpen(false)
    setEditingCareer(null)
  }

  const handleSaveEducation = (educationData: Omit<EducationEntry, 'id'>) => {
    if (editingEducation) {
      setEducation(prev => prev.map(item => 
        item.id === editingEducation.id ? { ...educationData, id: editingEducation.id } : item
      ))
    } else {
      setEducation(prev => [...prev, { ...educationData, id: Date.now().toString() }])
    }
    setIsEducationDialogOpen(false)
    setEditingEducation(null)
  }

  const handleSaveAchievement = (achievementData: Omit<AchievementEntry, 'id'>) => {
    if (editingAchievement) {
      setAchievements(prev => prev.map(item => 
        item.id === editingAchievement.id ? { ...achievementData, id: editingAchievement.id } : item
      ))
    } else {
      setAchievements(prev => [...prev, { ...achievementData, id: Date.now().toString() }])
    }
    setIsAchievementDialogOpen(false)
    setEditingAchievement(null)
  }

  const deleteCareer = (id: string) => {
    setCareer(prev => prev.filter(item => item.id !== id))
  }

  const deleteEducation = (id: string) => {
    setEducation(prev => prev.filter(item => item.id !== id))
  }

  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(item => item.id !== id))
  }

  const handleSaveProfile = () => {
    // TODO: Implement actual save functionality
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
    navigate(`/profile/${slug}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <p className="text-muted-foreground">Update your professional information and timeline</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate(`/profile/${slug}`)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Basic Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your primary profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-lg">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    value={profile.profession}
                    onChange={(e) => handleProfileChange('profession', e.target.value)}
                    placeholder="Your current profession or title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => handleProfileChange('location', e.target.value)}
                  placeholder="City, State, Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  placeholder="Tell people about yourself, your experience, and what you do"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How people can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => handleProfileChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={profile.linkedin}
                    onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={profile.twitter}
                  onChange={(e) => handleProfileChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add your professional skills and expertise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Sections */}
          <Tabs defaultValue="career" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="career">Career History</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Career Tab */}
            <TabsContent value="career" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Career History</h3>
                  <p className="text-sm text-muted-foreground">Your professional experience timeline</p>
                </div>
                <Dialog open={isCareerDialogOpen} onOpenChange={setIsCareerDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingCareer(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Position
                    </Button>
                  </DialogTrigger>
                  <CareerDialog
                    career={editingCareer}
                    onSave={handleSaveCareer}
                    onClose={() => {
                      setIsCareerDialogOpen(false)
                      setEditingCareer(null)
                    }}
                  />
                </Dialog>
              </div>

              <div className="space-y-4">
                {career.map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <CardDescription className="text-base font-medium text-primary">
                            {job.company} • {job.location}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(job.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} - {job.endDate ? new Date(job.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Present'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingCareer(job)
                              setIsCareerDialogOpen(true)
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteCareer(job.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{job.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Education</h3>
                  <p className="text-sm text-muted-foreground">Your educational background</p>
                </div>
                <Dialog open={isEducationDialogOpen} onOpenChange={setIsEducationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingEducation(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </DialogTrigger>
                  <EducationDialog
                    education={editingEducation}
                    onSave={handleSaveEducation}
                    onClose={() => {
                      setIsEducationDialogOpen(false)
                      setEditingEducation(null)
                    }}
                  />
                </Dialog>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <Card key={edu.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{edu.degree}</CardTitle>
                          <CardDescription className="text-base font-medium text-primary">
                            {edu.institution} • {edu.location}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} - {new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingEducation(edu)
                              setIsEducationDialogOpen(true)
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteEducation(edu.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Achievements</h3>
                  <p className="text-sm text-muted-foreground">Awards, recognitions, and notable accomplishments</p>
                </div>
                <Dialog open={isAchievementDialogOpen} onOpenChange={setIsAchievementDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingAchievement(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Achievement
                    </Button>
                  </DialogTrigger>
                  <AchievementDialog
                    achievement={editingAchievement}
                    onSave={handleSaveAchievement}
                    onClose={() => {
                      setIsAchievementDialogOpen(false)
                      setEditingAchievement(null)
                    }}
                  />
                </Dialog>
              </div>

              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <CardDescription className="text-base font-medium text-primary">
                            {achievement.organization}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingAchievement(achievement)
                              setIsAchievementDialogOpen(true)
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteAchievement(achievement.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Career Dialog Component
function CareerDialog({ 
  career, 
  onSave, 
  onClose 
}: { 
  career: CareerEntry | null
  onSave: (data: Omit<CareerEntry, 'id'>) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    title: career?.title || '',
    company: career?.company || '',
    location: career?.location || '',
    startDate: career?.startDate || '',
    endDate: career?.endDate || '',
    description: career?.description || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      endDate: formData.endDate || null
    })
  }

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>{career ? 'Edit Position' : 'Add Position'}</DialogTitle>
        <DialogDescription>
          Add details about your professional experience
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Senior Software Engineer"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Tech Corp Inc."
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="San Francisco, CA"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="month"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="month"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              placeholder="Leave empty if current"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your role, responsibilities, and achievements..."
            rows={3}
            required
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {career ? 'Update' : 'Add'} Position
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

// Education Dialog Component
function EducationDialog({ 
  education, 
  onSave, 
  onClose 
}: { 
  education: EducationEntry | null
  onSave: (data: Omit<EducationEntry, 'id'>) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    degree: education?.degree || '',
    institution: education?.institution || '',
    location: education?.location || '',
    startDate: education?.startDate || '',
    endDate: education?.endDate || '',
    description: education?.description || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>{education ? 'Edit Education' : 'Add Education'}</DialogTitle>
        <DialogDescription>
          Add details about your educational background
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="degree">Degree</Label>
          <Input
            id="degree"
            value={formData.degree}
            onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
            placeholder="Bachelor of Science in Computer Science"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              value={formData.institution}
              onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
              placeholder="Stanford University"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Stanford, CA"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="month"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="month"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Thesis, specialization, notable achievements..."
            rows={3}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {education ? 'Update' : 'Add'} Education
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

// Achievement Dialog Component
function AchievementDialog({ 
  achievement, 
  onSave, 
  onClose 
}: { 
  achievement: AchievementEntry | null
  onSave: (data: Omit<AchievementEntry, 'id'>) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    title: achievement?.title || '',
    organization: achievement?.organization || '',
    date: achievement?.date || '',
    description: achievement?.description || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>{achievement ? 'Edit Achievement' : 'Add Achievement'}</DialogTitle>
        <DialogDescription>
          Add details about your awards, recognitions, and accomplishments
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Best Paper Award"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              value={formData.organization}
              onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
              placeholder="NeurIPS 2023"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="month"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the achievement and its significance..."
            rows={3}
            required
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {achievement ? 'Update' : 'Add'} Achievement
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}