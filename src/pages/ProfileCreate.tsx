import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Upload, Plus, X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'

export default function ProfileCreate() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  // Profile state
  const [profile, setProfile] = useState({
    name: '',
    profession: '',
    location: '',
    bio: '',
    email: '',
    phone: '',
    website: '',
    linkedin: '',
    twitter: '',
    avatar: ''
  })

  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')

  const [hasCareer, setHasCareer] = useState(false)
  const [career, setCareer] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const [hasEducation, setHasEducation] = useState(false)
  const [education, setEducation] = useState({
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleCareerChange = (field: string, value: string) => {
    setCareer(prev => ({ ...prev, [field]: value }))
  }

  const handleEducationChange = (field: string, value: string) => {
    setEducation(prev => ({ ...prev, [field]: value }))
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

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleCreateProfile = () => {
    // TODO: Implement actual profile creation
    toast({
      title: "Profile Created!",
      description: "Your professional profile has been successfully created.",
    })
    
    // Generate a slug from the name
    const slug = profile.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    navigate(`/profile/${slug}`)
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return profile.name && profile.profession && profile.location && profile.bio
      case 2:
        return profile.email
      case 3:
        return skills.length > 0
      case 4:
        return true // Optional step
      default:
        return false
    }
  }

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
            <p className="text-muted-foreground">
              Join the global professional directory and showcase your expertise
            </p>
            <div className="mt-6">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Tell us about yourself and what you do
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-lg">
                      {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">
                      Optional: Add a professional photo
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession">Current Profession *</Label>
                    <Input
                      id="profession"
                      value={profile.profession}
                      onChange={(e) => handleProfileChange('profession', e.target.value)}
                      placeholder="e.g., Software Engineer, Marketing Manager, Designer"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      placeholder="City, State, Country"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      placeholder="Write a brief description about your professional background, experience, and what you do. This will be the first thing people see on your profile."
                      rows={4}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      {profile.bio.length}/500 characters
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  Contact Information
                </CardTitle>
                <CardDescription>
                  How can people reach you? (Email is required, others are optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => handleProfileChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={profile.linkedin}
                    onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter Profile</Label>
                  <Input
                    id="twitter"
                    value={profile.twitter}
                    onChange={(e) => handleProfileChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Skills */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  Skills & Expertise
                </CardTitle>
                <CardDescription>
                  Add your professional skills to help people find you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-md">
                  {skills.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No skills added yet. Add some skills to showcase your expertise.
                    </p>
                  ) : (
                    skills.map((skill) => (
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
                    ))
                  )}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., JavaScript, Project Management, Design)"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Skill Suggestions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'Python', 'Project Management', 'Marketing', 'Design', 'Data Analysis', 'Leadership', 'Communication'].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!skills.includes(suggestion)) {
                            setSkills(prev => [...prev, suggestion])
                          }
                        }}
                        disabled={skills.includes(suggestion)}
                      >
                        {skills.includes(suggestion) && <CheckCircle className="h-3 w-3 mr-1" />}
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Experience (Optional) */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    4
                  </div>
                  Experience (Optional)
                </CardTitle>
                <CardDescription>
                  Add your current or most recent position and education. You can add more details later.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Position */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasCareer"
                      checked={hasCareer}
                      onChange={(e) => setHasCareer(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="hasCareer" className="font-medium">
                      Add current position
                    </Label>
                  </div>

                  {hasCareer && (
                    <div className="space-y-4 pl-6 border-l-2 border-muted">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input
                            id="jobTitle"
                            value={career.title}
                            onChange={(e) => handleCareerChange('title', e.target.value)}
                            placeholder="Senior Software Engineer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={career.company}
                            onChange={(e) => handleCareerChange('company', e.target.value)}
                            placeholder="Tech Corp Inc."
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobLocation">Location</Label>
                        <Input
                          id="jobLocation"
                          value={career.location}
                          onChange={(e) => handleCareerChange('location', e.target.value)}
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="month"
                            value={career.startDate}
                            onChange={(e) => handleCareerChange('startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="month"
                            value={career.endDate}
                            onChange={(e) => handleCareerChange('endDate', e.target.value)}
                            placeholder="Leave empty if current"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasEducation"
                      checked={hasEducation}
                      onChange={(e) => setHasEducation(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="hasEducation" className="font-medium">
                      Add education
                    </Label>
                  </div>

                  {hasEducation && (
                    <div className="space-y-4 pl-6 border-l-2 border-muted">
                      <div className="space-y-2">
                        <Label htmlFor="degree">Degree</Label>
                        <Input
                          id="degree"
                          value={education.degree}
                          onChange={(e) => handleEducationChange('degree', e.target.value)}
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="institution">Institution</Label>
                          <Input
                            id="institution"
                            value={education.institution}
                            onChange={(e) => handleEducationChange('institution', e.target.value)}
                            placeholder="Stanford University"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eduLocation">Location</Label>
                          <Input
                            id="eduLocation"
                            value={education.location}
                            onChange={(e) => handleEducationChange('location', e.target.value)}
                            placeholder="Stanford, CA"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="eduStartDate">Start Date</Label>
                          <Input
                            id="eduStartDate"
                            type="month"
                            value={education.startDate}
                            onChange={(e) => handleEducationChange('startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eduEndDate">End Date</Label>
                          <Input
                            id="eduEndDate"
                            type="month"
                            value={education.endDate}
                            onChange={(e) => handleEducationChange('endDate', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Don't worry!</strong> You can always add more positions, education, and achievements after creating your profile.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleCreateProfile}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Create Profile
              </Button>
            )}
          </div>

          {/* Step indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}