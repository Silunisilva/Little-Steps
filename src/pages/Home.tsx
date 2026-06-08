import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  BookOpen,
  Music,
  Palette,
  Activity,
  Users,
  Award,
  Heart,
  ChevronRight,
  Play,
  CheckCircle,
} from 'lucide-react';

const stats = [
  { value: '350+', label: 'Happy Students', icon: Users, color: 'text-primary-500 bg-primary-50' },
  { value: '28', label: 'Expert Teachers', icon: Award, color: 'text-secondary-500 bg-secondary-50' },
  { value: '15+', label: 'Years of Excellence', icon: Star, color: 'text-warm-500 bg-warm-50' },
  { value: '98%', label: 'Parent Satisfaction', icon: Heart, color: 'text-accent-500 bg-accent-50' },
];

const programs = [
  {
    title: 'Toddler Explorers',
    ageRange: '18 months - 2 years',
    description: 'Gentle introduction to social play, sensory exploration, and early language development in a safe, nurturing environment.',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Heart,
    color: 'from-rose-400 to-pink-500',
    badgeColor: 'bg-rose-50 text-rose-600',
  },
  {
    title: 'Nursery Stars',
    ageRange: '2 - 3 years',
    description: 'Building confidence through play-based learning, creative arts, music, and developing friendships.',
    image: 'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Music,
    color: 'from-amber-400 to-orange-500',
    badgeColor: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Pre K Adventurers',
    ageRange: '3 - 4 years',
    description: 'Structured learning with phonics, numeracy, science explorations, and social-emotional growth.',
    image: 'https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: BookOpen,
    color: 'from-teal-400 to-emerald-500',
    badgeColor: 'bg-teal-50 text-teal-600',
  },
  {
    title: 'Kindergarten Ready',
    ageRange: '4 - 5 years',
    description: 'Comprehensive school readiness program with advanced literacy, math concepts, and critical thinking skills.',
    image: 'https://images.pexels.com/photos/8613164/pexels-photo-8613164.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Palette,
    color: 'from-sky-400 to-blue-500',
    badgeColor: 'bg-sky-50 text-sky-600',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Parent of Emma, 4',
    quote: "Little Steps has been the most wonderful place for Emma's growth. The teachers are incredibly caring and the learning environment is truly magical.",
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Michael Chen',
    role: 'Parent of Lucas, 3',
    quote: "I love how the school balances structured learning with creative play. Lucas comes home excited about what he learned every single day!",
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Priya Patel',
    role: 'Parent of Aanya, 4',
    quote: "The communication from the teachers is exceptional. I always know exactly how my daughter is progressing and what to reinforce at home.",
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

const features = [
  'Low child to teacher ratios (1:5)',
  'NAEYC accredited curriculum',
  'Daily healthy, chef-prepared meals',
  'Safe, stimulating learning environments',
  'Regular parent-teacher communication',
  'Before & after school care available',
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-hero dark:bg-gray-900 pt-16">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-primary-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary-200/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-accent-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">Now Enrolling for 2025–2026</span>
              </div>

              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-display leading-tight text-gray-900 dark:text-white">
                  Where Little{' '}
                  <span className="text-gradient">Minds</span>{' '}
                  Take Big{' '}
                  <span className="text-gradient">Steps</span>
                </h1>
                <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                  A warm, nurturing preschool where every child is celebrated, creativity flourishes, and lifelong love of learning begins.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/programs" className="btn-primary text-base px-7 py-3.5">
                  Explore Programs
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/contact" className="btn-outline text-base px-7 py-3.5">
                  Schedule a Tour
                </Link>
              </div>

              {/* Quick features */}
              <div className="grid grid-cols-2 gap-3">
                {features.slice(0, 4).map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 text-secondary-500 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Happy children learning at Little Steps Preschool"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl animate-bounce-gentle">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 dark:text-white text-sm">Top Rated</div>
                    <div className="text-xs text-gray-500">Preschool 2024</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-sm text-gray-800 dark:text-white">5.0</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">350+ Happy Families</div>
              </div>

              {/* Play button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group">
                  <Play className="w-6 h-6 text-primary-500 fill-current ml-1 group-hover:text-primary-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all">
                <div className={`w-12 h-12 ${stat.color} dark:bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-extrabold font-display text-gray-800 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-secondary-50 dark:bg-secondary-900/30 rounded-full px-4 py-1.5 mb-4">
              <BookOpen className="w-4 h-4 text-secondary-500" />
              <span className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">Our Programs</span>
            </div>
            <h2 className="section-title dark:text-white">
              Learning Programs for{' '}
              <span className="text-gradient">Every Age</span>
            </h2>
            <p className="section-subtitle dark:text-gray-400 mx-auto">
              Age-appropriate curricula designed to inspire curiosity and build foundational skills for lifelong success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <div key={program.title} className="card overflow-hidden group dark:bg-gray-900 hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-40`} />
                  <div className="absolute top-3 left-3">
                    <span className={`badge ${program.badgeColor} text-xs`}>
                      {program.ageRange}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-gray-800 dark:text-white font-display text-lg">{program.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{program.description}</p>
                  <Link
                    to="/programs"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 mt-4 group/link"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/programs" className="btn-secondary">
              View All Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/8612990/pexels-photo-8612990.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Children painting"
                  className="rounded-2xl h-52 w-full object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Children reading"
                  className="rounded-2xl h-52 w-full object-cover mt-8"
                />
                <img
                  src="https://images.pexels.com/photos/8613164/pexels-photo-8613164.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Children playing"
                  className="rounded-2xl h-52 w-full object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Children learning"
                  className="rounded-2xl h-52 w-full object-cover mt-8"
                />
              </div>
              {/* Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-2xl text-center border-2 border-primary-100 dark:border-primary-900">
                <div className="text-4xl font-extrabold text-gradient font-display">15+</div>
                <div className="text-xs font-bold text-gray-500 mt-1">Years of Trust</div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 rounded-full px-4 py-1.5 mb-4">
                  <Activity className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">Why Choose Us</span>
                </div>
                <h2 className="section-title dark:text-white">
                  A Place Your Child Will{' '}
                  <span className="text-gradient">Love to Learn</span>
                </h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                  We combine play-based learning with structured educational goals to create a well-rounded experience that prepares children for kindergarten and beyond.
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group">
                    <div className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-200 transition-colors">
                      <CheckCircle className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn-primary inline-flex">
                Our Story
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Parent Testimonials</span>
            </div>
            <h2 className="section-title dark:text-white">
              Words from Our{' '}
              <span className="text-gradient">Happy Families</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-6 dark:bg-gray-800 hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-primary-100"
                  />
                  <div>
                    <div className="font-bold text-gray-800 dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white mb-6">
            Ready to Begin Your Child's Journey?
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Enroll today and give your little one the best possible start in life. Limited spots available.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-primary-50 font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 inline-flex items-center gap-2"
            >
              Apply for Admission
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/programs"
              className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-full transition-all inline-flex items-center gap-2"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
