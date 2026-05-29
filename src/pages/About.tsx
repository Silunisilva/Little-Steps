import { Link } from 'react-router-dom';
import { Heart, Star, Award, Users, BookOpen, ArrowRight, Target, Eye } from 'lucide-react';

const teachers = [
  {
    name: 'Ms. Sarah Williams',
    role: 'Head Teacher & Director',
    bio: 'With 15 years of early childhood education experience, Sarah leads our teaching team with warmth and expertise.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    speciality: 'Child Development',
    badge: 'bg-primary-50 text-primary-600',
  },
  {
    name: 'Mr. James Torres',
    role: 'Pre-K Lead Educator',
    bio: "James brings creativity and enthusiasm to the classroom, making every lesson an adventure for his students.",
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    speciality: 'STEM & Technology',
    badge: 'bg-secondary-50 text-secondary-600',
  },
  {
    name: 'Ms. Maya Patel',
    role: 'Arts & Music Educator',
    bio: 'Maya inspires young artists and musicians, believing every child has a unique creative voice worth celebrating.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    speciality: 'Creative Arts',
    badge: 'bg-warm-50 text-warm-600',
  },
  {
    name: 'Ms. Lisa Kim',
    role: 'Toddler Program Lead',
    bio: 'Lisa has a special gift for nurturing the youngest learners, creating a safe and loving environment for toddlers.',
    image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
    speciality: 'Early Development',
    badge: 'bg-accent-50 text-accent-600',
  },
];

const milestones = [
  { year: '2008', event: 'Little Steps Preschool founded with just 12 students' },
  { year: '2011', event: 'Received NAEYC Accreditation — top 5% nationally' },
  { year: '2014', event: 'Expanded to include Toddler and Pre-K programs' },
  { year: '2017', event: 'Opened second campus in the community' },
  { year: '2020', event: 'Launched digital parent portal and virtual learning' },
  { year: '2024', event: 'Celebrated 350+ graduates with 98% parent satisfaction' },
];

const values = [
  { icon: Heart, title: 'Nurturing Care', desc: 'Every child deserves to feel safe, loved, and supported in their learning journey.', color: 'text-rose-500 bg-rose-50' },
  { icon: Star, title: 'Excellence', desc: 'We hold ourselves to the highest standards in early childhood education.', color: 'text-amber-500 bg-amber-50' },
  { icon: Users, title: 'Community', desc: 'Building strong partnerships between families, educators, and the broader community.', color: 'text-teal-500 bg-teal-50' },
  { icon: BookOpen, title: 'Curiosity', desc: 'Fostering a lifelong love of learning through exploration, questions, and discovery.', color: 'text-sky-500 bg-sky-50' },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 rounded-full px-4 py-1.5 mb-6">
              <Heart className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">Our Story</span>
            </div>
            <h1 className="section-title dark:text-white mb-6">
              Building Foundations for a{' '}
              <span className="text-gradient">Lifetime of Learning</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
              Since 2008, Little Steps Preschool has been a trusted haven where children discover the joy of learning,
              forge lasting friendships, and build the skills they need to thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Children at Little Steps"
                className="rounded-3xl w-full h-[460px] object-cover shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold font-display text-gray-800 dark:text-white">
                How It All Began
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Little Steps was born from a simple belief: every child deserves a magical beginning. In 2008,
                our founder Sarah Williams opened our doors with just 12 students and a dream to create a place
                where children could learn through play, exploration, and genuine love of discovery.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Today, we've grown into a thriving community of over 350 students, 28 dedicated educators, and
                thousands of families who've trusted us with their most precious gift — their children.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                We remain NAEYC accredited and committed to providing the highest quality early childhood education
                through research-based curriculum, low teacher-to-student ratios, and an unwavering dedication to
                each child's individual journey.
              </p>

              {/* Timeline */}
              <div className="space-y-4 pt-4">
                {milestones.map((m) => (
                  <div key={m.year} className="flex items-start gap-4">
                    <div className="w-16 flex-shrink-0 text-sm font-bold text-primary-500">{m.year}</div>
                    <div className="flex-1 text-sm text-gray-600 dark:text-gray-400 pt-0.5">{m.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="card p-8 dark:bg-gray-900 border-l-4 border-primary-500">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/40 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                To provide a safe, inclusive, and enriching environment where every child is empowered to explore,
                learn, and grow. We partner with families to nurture the whole child — intellectually, socially,
                emotionally, and physically — through play-based, developmentally appropriate education.
              </p>
            </div>

            <div className="card p-8 dark:bg-gray-900 border-l-4 border-secondary-500">
              <div className="w-12 h-12 bg-secondary-50 dark:bg-secondary-900/40 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-secondary-500" />
              </div>
              <h3 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                A world where every child enters school with confidence, curiosity, and a deep sense of belonging.
                We envision Little Steps as the model for early childhood excellence — where innovation in teaching
                meets genuine love for children and community.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="section-title dark:text-white">
              Our Core <span className="text-gradient">Values</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card p-6 dark:bg-gray-900 text-center hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 ${v.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <v.icon className="w-7 h-7" />
                </div>
                <h4 className="font-extrabold font-display text-gray-800 dark:text-white mb-2">{v.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-secondary-50 dark:bg-secondary-900/30 rounded-full px-4 py-1.5 mb-4">
              <Award className="w-4 h-4 text-secondary-500" />
              <span className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">Meet Our Team</span>
            </div>
            <h2 className="section-title dark:text-white">
              Passionate <span className="text-gradient">Educators</span>
            </h2>
            <p className="section-subtitle dark:text-gray-400 mx-auto">
              Our teachers hold advanced degrees in early childhood education and bring years of dedicated experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher) => (
              <div key={teacher.name} className="card overflow-hidden group dark:bg-gray-800 hover:-translate-y-2 transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <span className={`badge ${teacher.badge} text-xs mb-3`}>{teacher.speciality}</span>
                  <h4 className="font-extrabold font-display text-gray-800 dark:text-white">{teacher.name}</h4>
                  <p className="text-sm font-semibold text-primary-500 mb-2">{teacher.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{teacher.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold font-display text-white mb-4">
            Come Visit Us — We'd Love to Meet You!
          </h2>
          <p className="text-white/80 mb-8">
            Schedule a tour and see firsthand why families trust Little Steps with their children's most formative years.
          </p>
          <Link to="/contact" className="bg-white text-primary-600 hover:bg-primary-50 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-lg transition-all">
            Schedule a Tour
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
