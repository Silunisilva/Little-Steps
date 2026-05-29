import { Link } from 'react-router-dom';
import { Clock, Users, CheckCircle, ArrowRight, BookOpen, Music, Palette, Activity, Heart, Zap } from 'lucide-react';

const programGroups = [
  {
    id: 'toddlers',
    title: 'Toddler Explorers',
    ageRange: '18 months – 2 years',
    icon: Heart,
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
    borderColor: 'border-rose-200 dark:border-rose-800',
    badgeColor: 'bg-rose-100 text-rose-700',
    iconColor: 'text-rose-500',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
    schedule: 'Mon–Fri, 8:00 AM – 12:00 PM',
    classSize: 'Max 8 children',
    ratio: '1:4 teacher-child ratio',
    description: 'Our Toddler program provides the perfect gentle introduction to group learning. In a cozy, homelike setting, little ones develop social awareness, language skills, and physical coordination through carefully designed play experiences.',
    highlights: [
      'Sensory play stations',
      'Music and movement',
      'Outdoor nature walks',
      'Storytime and puppetry',
      'Art exploration',
      'Gentle social skill building',
    ],
  },
  {
    id: 'nursery',
    title: 'Nursery Stars',
    ageRange: '2 – 3 years',
    icon: Music,
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    badgeColor: 'bg-amber-100 text-amber-700',
    iconColor: 'text-amber-500',
    image: 'https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg?auto=compress&cs=tinysrgb&w=800',
    schedule: 'Mon–Fri, 8:00 AM – 2:00 PM',
    classSize: 'Max 12 children',
    ratio: '1:5 teacher-child ratio',
    description: 'Nursery Stars blossoms creativity and independence. Children engage in themed learning centers, dramatic play, and collaborative projects that build confidence, vocabulary, and early literacy foundations.',
    highlights: [
      'Language-rich environments',
      'Dramatic play & role play',
      'Early phonics introduction',
      'Number concepts through games',
      'Creative art & craft',
      'Healthy habits & self-care',
    ],
  },
  {
    id: 'prek',
    title: 'Pre-K Adventurers',
    ageRange: '3 – 4 years',
    icon: BookOpen,
    color: 'from-teal-400 to-emerald-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    borderColor: 'border-teal-200 dark:border-teal-800',
    badgeColor: 'bg-teal-100 text-teal-700',
    iconColor: 'text-teal-500',
    image: 'https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=800',
    schedule: 'Mon–Fri, 8:00 AM – 3:00 PM',
    classSize: 'Max 15 children',
    ratio: '1:6 teacher-child ratio',
    description: 'Pre-K Adventurers dive deeper into structured learning while maintaining the joy and wonder of early childhood. Children explore science concepts, mathematical thinking, and expand their literacy skills through engaging, hands-on activities.',
    highlights: [
      'Structured phonics & reading',
      'Math foundations (counting, patterns)',
      'Science experiments',
      'Problem-solving activities',
      'Social-emotional learning',
      'Spanish language introduction',
    ],
  },
  {
    id: 'kindergarten',
    title: 'Kindergarten Ready',
    ageRange: '4 – 5 years',
    icon: Palette,
    color: 'from-sky-400 to-blue-500',
    bgColor: 'bg-sky-50 dark:bg-sky-900/20',
    borderColor: 'border-sky-200 dark:border-sky-800',
    badgeColor: 'bg-sky-100 text-sky-700',
    iconColor: 'text-sky-500',
    image: 'https://images.pexels.com/photos/8613164/pexels-photo-8613164.jpeg?auto=compress&cs=tinysrgb&w=800',
    schedule: 'Mon–Fri, 8:00 AM – 3:30 PM',
    classSize: 'Max 18 children',
    ratio: '1:7 teacher-child ratio',
    description: 'Our flagship Kindergarten Ready program ensures children leave Little Steps fully prepared for the next chapter. From advanced literacy and numeracy to critical thinking and emotional regulation, we set children up for lasting success.',
    highlights: [
      'Advanced reading readiness',
      'Writing skills & composition',
      'Mathematical reasoning',
      'Critical thinking & logic',
      'Conflict resolution',
      'School transition preparation',
    ],
  },
];

const additionalPrograms = [
  {
    icon: Activity,
    title: 'After School Care',
    desc: 'Supervised afternoon program with homework help, enrichment activities, and snacks until 6:00 PM.',
    color: 'text-secondary-500 bg-secondary-50',
  },
  {
    icon: Zap,
    title: 'Summer Camp',
    desc: 'Eight weeks of themed fun, outdoor adventures, field trips, and exciting learning experiences.',
    color: 'text-primary-500 bg-primary-50',
  },
  {
    icon: Music,
    title: 'Music & Movement',
    desc: 'Dedicated music classes with instruments, singing, and creative movement for all age groups.',
    color: 'text-warm-500 bg-warm-50',
  },
];

export default function Programs() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary-50 dark:bg-secondary-900/30 rounded-full px-4 py-1.5 mb-6">
            <BookOpen className="w-4 h-4 text-secondary-500" />
            <span className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">Our Programs</span>
          </div>
          <h1 className="section-title dark:text-white mb-6">
            Programs Designed for{' '}
            <span className="text-gradient">Every Stage</span>
          </h1>
          <p className="section-subtitle dark:text-gray-400 mx-auto">
            Each program is thoughtfully crafted to meet children exactly where they are, nurturing their unique
            potential at every developmental stage.
          </p>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {programGroups.map((program, index) => (
            <div
              key={program.id}
              id={program.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative rounded-3xl overflow-hidden shadow-xl group">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-20`} />
                  <div className="absolute top-4 left-4">
                    <span className={`badge ${program.badgeColor} text-sm font-bold`}>
                      {program.ageRange}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl ${program.bgColor} border ${program.borderColor}`}>
                  <program.icon className={`w-5 h-5 ${program.iconColor}`} />
                  <span className={`font-bold ${program.iconColor}`}>{program.title}</span>
                </div>

                <h2 className="text-3xl font-extrabold font-display text-gray-800 dark:text-white">
                  {program.ageRange}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{program.description}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 text-primary-400" />
                    {program.schedule}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 text-secondary-400" />
                    {program.classSize}
                  </div>
                </div>

                <div className={`p-4 rounded-2xl ${program.bgColor} border ${program.borderColor}`}>
                  <p className={`text-sm font-semibold ${program.iconColor} mb-3`}>Program Highlights</p>
                  <div className="grid grid-cols-2 gap-2">
                    {program.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className={`w-4 h-4 ${program.iconColor} flex-shrink-0`} />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/contact" className="btn-primary inline-flex">
                  Enroll Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Programs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title dark:text-white">
              Additional <span className="text-gradient">Programs</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {additionalPrograms.map((p) => (
              <div key={p.title} className="card p-8 dark:bg-gray-900 text-center hover:-translate-y-1 transition-all">
                <div className={`w-16 h-16 ${p.color} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  <p.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold font-display text-gray-800 dark:text-white mb-3">{p.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-secondary-500 to-accent-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold font-display text-white mb-4">
            Find the Perfect Program for Your Child
          </h2>
          <p className="text-white/80 mb-8">
            Not sure which program is right? Our admissions team is happy to help you choose based on your child's age and developmental needs.
          </p>
          <Link to="/contact" className="bg-white text-secondary-600 hover:bg-secondary-50 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">
            Talk to Admissions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
