import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Filter, MapPin, Shield, Star, Users, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [sortBy, setSortBy] = useState('relevance')
  const [filters, setFilters] = useState({
    verified: false,
    publicFigure: false,
    location: '',
    profession: '',
    skills: [] as string[]
  })

  // Mock search results
  const [results] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      slug: 'sarah-chen',
      profession: 'AI Research Scientist',
      location: 'San Francisco, CA',
      avatar: '/placeholder-avatar-1.jpg',
      verified: true,
      publicFigure: false,
      bio: 'Leading AI research at top tech companies, focusing on machine learning and neural networks.',
      skills: ['Machine Learning', 'AI', 'Python'],
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      slug: 'marcus-johnson',
      profession: 'Entrepreneur',
      location: 'New York, NY',
      avatar: '/placeholder-avatar-2.jpg',
      verified: true,
      publicFigure: true,
      bio: 'Serial entrepreneur and investor, founded 3 successful startups in fintech.',
      skills: ['Entrepreneurship', 'Fintech', 'Leadership'],
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      slug: 'elena-rodriguez',
      profession: 'Climate Scientist',
      location: 'Barcelona, Spain',
      avatar: '/placeholder-avatar-3.jpg',
      verified: true,
      publicFigure: false,
      bio: 'Environmental researcher working on climate change solutions and sustainability.',
      skills: ['Climate Science', 'Research', 'Sustainability'],
      lastUpdated: '2024-01-10'
    },
    {
      id: 4,
      name: 'David Kim',
      slug: 'david-kim',
      profession: 'Software Engineer',
      location: 'Seoul, South Korea',
      avatar: '/placeholder-avatar-4.jpg',
      verified: false,
      publicFigure: false,
      bio: 'Full-stack developer with expertise in React, Node.js, and cloud technologies.',
      skills: ['React', 'Node.js', 'AWS'],
      lastUpdated: '2024-01-08'
    },
    {
      id: 5,
      name: 'Dr. Amara Okafor',
      slug: 'amara-okafor',
      profession: 'Medical Researcher',
      location: 'Lagos, Nigeria',
      avatar: '/placeholder-avatar-5.jpg',
      verified: true,
      publicFigure: false,
      bio: 'Pioneering research in tropical diseases and public health in Africa.',
      skills: ['Medical Research', 'Public Health', 'Epidemiology'],
      lastUpdated: '2024-01-05'
    }
  ])

  const [filteredResults, setFilteredResults] = useState(results)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim())
    } else {
      params.delete('q')
    }
    setSearchParams(params)
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      verified: false,
      publicFigure: false,
      location: '',
      profession: '',
      skills: []
    })
  }

  // Apply filters
  useEffect(() => {
    let filtered = results

    if (filters.verified) {
      filtered = filtered.filter(result => result.verified)
    }

    if (filters.publicFigure) {
      filtered = filtered.filter(result => result.publicFigure)
    }

    if (filters.location) {
      filtered = filtered.filter(result => 
        result.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.profession) {
      filtered = filtered.filter(result => 
        result.profession.toLowerCase().includes(filters.profession.toLowerCase())
      )
    }

    setFilteredResults(filtered)
  }, [filters, results])

  const locations = ['San Francisco, CA', 'New York, NY', 'London, UK', 'Barcelona, Spain', 'Seoul, South Korea', 'Lagos, Nigeria']
  const professions = ['Software Engineer', 'Data Scientist', 'Designer', 'Marketing Manager', 'Entrepreneur', 'Researcher']
  const skillsList = ['JavaScript', 'Python', 'React', 'Machine Learning', 'Design', 'Marketing', 'Leadership', 'Research']

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Profile Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="verified" 
              checked={filters.verified}
              onCheckedChange={(checked) => handleFilterChange('verified', checked)}
            />
            <label htmlFor="verified" className="text-sm flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Verified Profiles
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="publicFigure" 
              checked={filters.publicFigure}
              onCheckedChange={(checked) => handleFilterChange('publicFigure', checked)}
            />
            <label htmlFor="publicFigure" className="text-sm flex items-center gap-1">
              <Star className="h-3 w-3" />
              Public Figures
            </label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Location</h3>
        <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any location</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-3">Profession</h3>
        <Select value={filters.profession} onValueChange={(value) => handleFilterChange('profession', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any profession" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any profession</SelectItem>
            {professions.map((profession) => (
              <SelectItem key={profession} value={profession}>{profession}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-3">Skills</h3>
        <div className="grid grid-cols-2 gap-2">
          {skillsList.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox 
                id={skill}
                checked={filters.skills.includes(skill)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleFilterChange('skills', [...filters.skills, skill])
                  } else {
                    handleFilterChange('skills', filters.skills.filter(s => s !== skill))
                  }
                }}
              />
              <label htmlFor={skill} className="text-sm">{skill}</label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, profession, location, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
            />
          </form>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Browse Directory'}
              </h1>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {filteredResults.length} profiles
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="verified">Verified First</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search results
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <main className="flex-1">
            {filteredResults.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No profiles found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResults.map((profile) => (
                  <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={profile.avatar} alt={profile.name} />
                          <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg truncate">{profile.name}</h3>
                            {profile.verified && (
                              <Shield className="h-4 w-4 text-primary" title="Verified Profile" />
                            )}
                            {profile.publicFigure && (
                              <Star className="h-4 w-4 text-accent" title="Public Figure" />
                            )}
                          </div>
                          <p className="text-primary font-medium">{profile.profession}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {profile.location}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{profile.bio}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {profile.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {profile.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{profile.skills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                          Updated {new Date(profile.lastUpdated).toLocaleDateString()}
                        </p>
                        <Button asChild>
                          <Link to={`/profile/${profile.slug}`}>
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}