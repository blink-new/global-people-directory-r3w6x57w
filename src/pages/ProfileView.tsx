import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { MapPin, Calendar, ExternalLink, Shield, Star, Flag, Edit, Mail, Phone, Globe, Linkedin, Twitter, User, Briefcase, GraduationCap, Award, Heart, Home, Users, BookOpen, Camera, Music, Plane, Coffee, Eye, TrendingUp, UserCheck, MessageCircle, Share2, Bookmark, Search, Trophy, Clock, Target, BarChart3, Activity, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getProfileBySlug } from '@/data/profiles'

export default function ProfileView() {
  const { slug } = useParams()
  const [isOwner] = useState(false) // TODO: Replace with actual ownership check
  const [activeSection, setActiveSection] = useState('about')

  // Get profile data from slug
  const profile = slug ? getProfileBySlug(slug) : null

  // If profile not found, redirect to 404 or homepage
  if (!profile) {
    return <Navigate to="/" replace />
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = formatDate(startDate)
    const end = endDate ? formatDate(endDate) : 'Present'
    return `${start} - ${end}`
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const sidebarSections = [
    { id: 'about', label: 'About', icon: User },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'personal', label: 'Personal Life', icon: Heart },
    { id: 'interests', label: 'Interests', icon: Coffee },
    { id: 'publications', label: 'Publications', icon: BookOpen }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar - Wikipedia Style */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* Profile Card */}
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <Avatar className="h-24 w-24 mx-auto mb-3">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback className="text-lg">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <h2 className="text-xl font-bold">{profile.name}</h2>
                        {profile.verified && (
                          <Shield className="h-5 w-5 text-primary" title="Verified Profile" />
                        )}
                        {profile.publicFigure && (
                          <Star className="h-5 w-5 text-accent" title="Public Figure" />
                        )}
                      </div>
                      <p className="text-primary font-medium">{profile.profession}</p>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    {/* Quick Facts */}
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Born:</span>
                        <p>{formatDate(profile.personalInfo.birthDate)} (age {calculateAge(profile.personalInfo.birthDate)})</p>
                        <p className="text-muted-foreground">{profile.personalInfo.birthPlace}</p>
                      </div>
                      
                      <div>
                        <span className="font-medium text-muted-foreground">Nationality:</span>
                        <p>{profile.personalInfo.nationality}</p>
                      </div>
                      
                      <div>
                        <span className="font-medium text-muted-foreground">Residence:</span>
                        <p className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {profile.personalInfo.residence}
                        </p>
                      </div>
                      
                      <div>
                        <span className="font-medium text-muted-foreground">Languages:</span>
                        <div className="space-y-1">
                          {profile.personalInfo.languages.map((lang, index) => (
                            <p key={index} className="text-xs">{lang}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    {/* Quick Stats */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Profile Views:</span>
                        <span className="font-medium">{profile.stats.profileViews.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Global Rank:</span>
                        <span className="font-medium">#{profile.stats.profileRank}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Connections:</span>
                        <span className="font-medium">{profile.stats.connectionsCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Response Rate:</span>
                        <span className="font-medium">{profile.stats.responseRate}%</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {isOwner ? (
                        <Button asChild className="w-full" size="sm">
                          <Link to={`/profile/${profile.slug}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" asChild className="w-full" size="sm">
                          <Link to={`/report/${profile.id}`}>
                            <Flag className="h-4 w-4 mr-2" />
                            Report Profile
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Navigation Menu */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Contents</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <nav className="space-y-1">
                      {sidebarSections.map((section) => {
                        const Icon = section.icon
                        return (
                          <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                              activeSection === section.id
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {section.label}
                          </button>
                        )
                      })}
                    </nav>
                  </CardContent>
                </Card>
                
                {/* Contact Links */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Connect</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {profile.email && (
                        <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <Mail className="h-4 w-4" />
                          Email
                        </a>
                      )}
                      {profile.website && (
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <Globe className="h-4 w-4" />
                          Website
                        </a>
                      )}
                      {profile.linkedin && (
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                      {profile.twitter && (
                        <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                
                {/* About Section */}
                {activeSection === 'about' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-6">{profile.name}</h1>
                    
                    {/* Main Biography */}
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-2xl">Biography</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-lg max-w-none">
                          <p className="text-lg leading-relaxed mb-4">{profile.bio}</p>
                          
                          {/* Extended biographical information */}
                          <div className="space-y-4 text-base leading-relaxed">
                            <p>
                              Born on {formatDate(profile.personalInfo.birthDate)} in {profile.personalInfo.birthPlace}, 
                              {profile.name} is a {calculateAge(profile.personalInfo.birthDate)}-year-old {profile.personalInfo.nationality.toLowerCase()} 
                              {profile.profession.toLowerCase()}. Currently residing in {profile.personalInfo.residence}, 
                              they have established themselves as a prominent figure in their field.
                            </p>
                            
                            {profile.career.length > 0 && (
                              <p>
                                Their professional journey began with their role as {profile.career[profile.career.length - 1]?.title} 
                                at {profile.career[profile.career.length - 1]?.company}, and they currently serve as {profile.career[0]?.title} 
                                at {profile.career[0]?.company}. Throughout their career, they have demonstrated expertise in 
                                {profile.skills.slice(0, 3).join(', ')}, among other areas.
                              </p>
                            )}
                            
                            {profile.education.length > 0 && (
                              <p>
                                Academically, {profile.name} holds a {profile.education[0]?.degree} from {profile.education[0]?.institution}, 
                                which provided the foundation for their professional achievements. Their educational background has been 
                                instrumental in shaping their approach to {profile.profession.toLowerCase()}.
                              </p>
                            )}
                            
                            {profile.achievements.length > 0 && (
                              <p>
                                Notable achievements include {profile.achievements[0]?.title} from {profile.achievements[0]?.organization}, 
                                which recognized their outstanding contributions to the field. This recognition, along with other accolades, 
                                has solidified their reputation as a leader in their industry.
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Professional Overview */}
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-2xl">Professional Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-lg mb-3">Current Position</h4>
                            {profile.career.length > 0 && (
                              <div className="space-y-2">
                                <p className="font-medium">{profile.career[0].title}</p>
                                <p className="text-muted-foreground">{profile.career[0].company}</p>
                                <p className="text-sm text-muted-foreground">{profile.career[0].location}</p>
                                <p className="text-sm">{profile.career[0].description}</p>
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-lg mb-3">Industry Focus</h4>
                            <p className="text-muted-foreground mb-3">{profile.profession}</p>
                            <div className="space-y-2">
                              <p className="text-sm"><span className="font-medium">Years of Experience:</span> {new Date().getFullYear() - new Date(profile.career[profile.career.length - 1]?.startDate || '2020').getFullYear()}+</p>
                              <p className="text-sm"><span className="font-medium">Specialization:</span> {profile.skills.slice(0, 2).join(', ')}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Skills & Expertise */}
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-2xl">Skills & Expertise</CardTitle>
                        <CardDescription>
                          Core competencies and areas of specialization
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-3">Technical Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {profile.skills.filter((_, index) => index % 2 === 0).map((skill) => (
                                <Badge key={skill} variant="default" className="text-sm">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Professional Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {profile.skills.filter((_, index) => index % 2 === 1).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Personal Information */}
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-2xl">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold">Basic Information</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-muted-foreground">Full Name:</span>
                                <p>{profile.name}</p>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">Age:</span>
                                <p>{calculateAge(profile.personalInfo.birthDate)} years old</p>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">Nationality:</span>
                                <p>{profile.personalInfo.nationality}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-semibold">Location</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-muted-foreground">Born:</span>
                                <p>{profile.personalInfo.birthPlace}</p>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">Current Residence:</span>
                                <p className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {profile.personalInfo.residence}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-semibold">Languages</h4>
                            <div className="space-y-1">
                              {profile.personalInfo.languages.map((lang, index) => (
                                <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">{lang}</Badge>
                              ))}\n                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Contact & Social */}
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-2xl">Contact & Social Media</CardTitle>
                        <CardDescription>
                          Connect and follow their professional journey
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Professional Links</h4>
                            <div className="space-y-3">
                              {profile.email && (
                                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors">
                                  <Mail className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                                  </div>
                                </a>
                              )}
                              {profile.website && (
                                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors">
                                  <Globe className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="font-medium">Website</p>
                                    <p className="text-sm text-muted-foreground">Personal website</p>
                                  </div>
                                </a>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3">Social Media</h4>
                            <div className="space-y-3">
                              {profile.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors">
                                  <Linkedin className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="font-medium">LinkedIn</p>
                                    <p className="text-sm text-muted-foreground">Professional network</p>
                                  </div>
                                </a>
                              )}
                              {profile.twitter && (
                                <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors">
                                  <Twitter className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="font-medium">Twitter</p>
                                    <p className="text-sm text-muted-foreground">Follow updates</p>
                                  </div>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Profile Statistics */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">Profile Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                          <div className="p-4 rounded-lg bg-muted">
                            <div className="text-2xl font-bold text-primary">{profile.career.length}</div>
                            <div className="text-sm text-muted-foreground">Career Positions</div>
                          </div>
                          <div className="p-4 rounded-lg bg-muted">
                            <div className="text-2xl font-bold text-primary">{profile.achievements.length}</div>
                            <div className="text-sm text-muted-foreground">Achievements</div>
                          </div>
                          <div className="p-4 rounded-lg bg-muted">
                            <div className="text-2xl font-bold text-primary">{profile.skills.length}</div>
                            <div className="text-sm text-muted-foreground">Skills Listed</div>
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Last updated: {new Date(profile.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Statistics Section */}
                {activeSection === 'stats' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-6">Profile Statistics</h1>
                    
                    {/* Overview Stats */}
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Eye className="h-6 w-6 text-primary" />
                          Profile Overview
                        </CardTitle>
                        <CardDescription>
                          Key metrics and engagement data for this profile
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                            <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{profile.stats.profileViews.toLocaleString()}</div>
                            <div className="text-sm text-blue-600 dark:text-blue-400">Profile Views</div>
                          </div>
                          
                          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{profile.stats.monthlyViews.toLocaleString()}</div>
                            <div className="text-sm text-green-600 dark:text-green-400">Monthly Views</div>
                          </div>
                          
                          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                            <UserCheck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{profile.stats.connectionsCount.toLocaleString()}</div>
                            <div className="text-sm text-purple-600 dark:text-purple-400">Connections</div>
                          </div>
                          
                          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                            <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">#{profile.stats.profileRank}</div>
                            <div className="text-sm text-orange-600 dark:text-orange-400">Global Rank</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Engagement Metrics */}
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Activity className="h-6 w-6 text-primary" />
                          Engagement Metrics
                        </CardTitle>
                        <CardDescription>
                          How users interact with this profile
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Share2 className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Profile Shares</span>
                              </div>
                              <span className="text-2xl font-bold text-primary">{profile.stats.profileShares}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Bookmark className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Bookmarks</span>
                              </div>
                              <span className="text-2xl font-bold text-primary">{profile.stats.bookmarks}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Search className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Search Appearances</span>
                              </div>
                              <span className="text-2xl font-bold text-primary">{profile.stats.searchAppearances.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MessageCircle className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Response Rate</span>
                              </div>
                              <span className="text-2xl font-bold text-primary">{profile.stats.responseRate}%</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Avg Response Time</span>
                              </div>
                              <span className="text-2xl font-bold text-primary">{profile.stats.averageResponseTime}h</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Endorsements</span>
                              </div>
                              <span className="text-2xl font-bold text-primary">{profile.stats.endorsements}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-muted">
                              <div className="flex items-center gap-2 mb-2">
                                <Target className="h-5 w-5 text-primary" />
                                <span className="font-medium">Profile Completeness</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-background rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${profile.stats.profileCompleteness}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{profile.stats.profileCompleteness}%</span>
                              </div>
                            </div>
                            
                            <div className="p-4 rounded-lg bg-muted">
                              <div className="flex items-center gap-2 mb-2">
                                <Trophy className="h-5 w-5 text-primary" />
                                <span className="font-medium">Industry Ranking</span>
                              </div>
                              <div className="text-center">
                                <div className="text-3xl font-bold text-primary">#{profile.stats.industryRanking}</div>
                                <div className="text-sm text-muted-foreground">in {profile.profession}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Activity Timeline */}
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Calendar className="h-6 w-6 text-primary" />
                          Activity Timeline
                        </CardTitle>
                        <CardDescription>
                          Key dates and milestones
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg border">
                              <div className="p-2 rounded-full bg-primary/10">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">Joined Platform</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(profile.stats.joinedDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 rounded-lg border">
                              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                                <Activity className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium">Last Active</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(profile.stats.lastActiveDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg border">
                              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                                <Edit className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium">Profile Updated</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(profile.lastUpdated).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 rounded-lg border">
                              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                                <Zap className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <div className="font-medium">Platform Experience</div>
                                <div className="text-sm text-muted-foreground">
                                  {Math.floor((new Date().getTime() - new Date(profile.stats.joinedDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Performance Insights */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <BarChart3 className="h-6 w-6 text-primary" />
                          Performance Insights
                        </CardTitle>
                        <CardDescription>
                          Detailed analytics and performance metrics
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="p-4 rounded-lg border bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Total Reach</h4>
                              <Eye className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-1">
                              {profile.stats.totalViews.toLocaleString()}
                            </div>
                            <div className="text-sm text-indigo-600 dark:text-indigo-400">
                              All-time profile views
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg border bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Engagement Score</h4>
                              <TrendingUp className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-1">
                              {Math.round((profile.stats.profileShares + profile.stats.bookmarks + profile.stats.endorsements) / 10)}
                            </div>
                            <div className="text-sm text-emerald-600 dark:text-emerald-400">
                              Based on interactions
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg border bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-amber-700 dark:text-amber-300">Visibility Score</h4>
                              <Search className="h-5 w-5 text-amber-600" />
                            </div>
                            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-1">
                              {Math.round(profile.stats.searchAppearances / 100)}
                            </div>
                            <div className="text-sm text-amber-600 dark:text-amber-400">
                              Search discoverability
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <div className="text-center text-sm text-muted-foreground">
                          <p>Statistics are updated daily and reflect activity over the past 30 days unless otherwise noted.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Career Section */}
                {activeSection === 'career' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-6">Career History</h1>
                    <div className="space-y-6">
                      {profile.career.map((job, index) => (
                        <Card key={job.id}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                <CardDescription className="text-lg font-medium text-primary mt-1">
                                  {job.company} • {job.location}
                                </CardDescription>
                                <p className="text-muted-foreground flex items-center gap-1 mt-2">
                                  <Calendar className="h-4 w-4" />
                                  {formatDateRange(job.startDate, job.endDate)}
                                </p>
                              </div>
                              {index === 0 && (
                                <Badge variant="secondary">Current Position</Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Education Section */}
                {activeSection === 'education' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-6">Education</h1>
                    <div className="space-y-6">
                      {profile.education.map((edu) => (
                        <Card key={edu.id}>
                          <CardHeader>
                            <CardTitle className="text-xl">{edu.degree}</CardTitle>
                            <CardDescription className="text-lg font-medium text-primary mt-1">
                              {edu.institution} • {edu.location}
                            </CardDescription>
                            <p className="text-muted-foreground flex items-center gap-1 mt-2">
                              <Calendar className="h-4 w-4" />
                              {formatDateRange(edu.startDate, edu.endDate)}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Achievements Section */}
                {activeSection === 'achievements' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-6">Achievements & Awards</h1>
                    <div className="space-y-6">
                      {profile.achievements.map((achievement) => (
                        <Card key={achievement.id}>
                          <CardHeader>
                            <CardTitle className="text-xl">{achievement.title}</CardTitle>
                            <CardDescription className="text-lg font-medium text-primary mt-1">
                              {achievement.organization}
                            </CardDescription>
                            <p className="text-muted-foreground flex items-center gap-1 mt-2">
                              <Calendar className="h-4 w-4" />
                              {formatDate(achievement.date)}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Personal Life Section */}
                {activeSection === 'personal' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-6">Personal Life</h1>
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">Family & Background</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="font-medium text-muted-foreground">Birth:</span>
                              <p>{formatDate(profile.personalInfo.birthDate)} in {profile.personalInfo.birthPlace}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Nationality:</span>
                              <p>{profile.personalInfo.nationality}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Marital Status:</span>
                              <p>{profile.personalInfo.maritalStatus}</p>
                            </div>
                            <div>
                              <span className="font-medium text-muted-foreground">Children:</span>
                              <p>{profile.personalInfo.children}</p>
                            </div>
                          </div>
                          
                          <div>
                            <span className="font-medium text-muted-foreground">Languages:</span>
                            <div className="mt-2 space-y-1">
                              {profile.personalInfo.languages.map((lang, index) => (
                                <Badge key={index} variant="outline">{lang}</Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
                
                {/* Interests Section */}
                {activeSection === 'interests' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-6">Interests & Hobbies</h1>
                    <div className="space-y-6">
                      {profile.interests.map((category, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-xl">{category.category}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {category.items.map((item, itemIndex) => (
                                <Badge key={itemIndex} variant="secondary">{item}</Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Publications Section */}
                {activeSection === 'publications' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-6">Publications & Research</h1>
                    <div className="space-y-6">
                      {profile.publications && profile.publications.length > 0 ? (
                        profile.publications.map((pub, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <CardTitle className="text-xl">{pub.title}</CardTitle>
                              <CardDescription className="text-lg font-medium text-primary mt-1">
                                {pub.journal} • {pub.year}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ))
                      ) : (
                        <Card>
                          <CardContent className="pt-6">
                            <p className="text-muted-foreground text-center">No publications available.</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}