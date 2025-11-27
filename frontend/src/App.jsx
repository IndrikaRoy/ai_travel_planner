import React, { useState } from 'react';
import { Plane, Car, Hotel, UtensilsCrossed, MapPin, Sparkles, Calendar, Users, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

export default function TravelPlanner() {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    interests: []
  });
  
  const [loading, setLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState(null);
  const [error, setError] = useState('');

  const interestOptions = ['Adventure', 'Culture', 'Food', 'Nature', 'History', 'Relaxation', 'Shopping', 'Nightlife'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.destination || !formData.startDate || !formData.endDate) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setError('');
    setTravelPlan(null);

    try {
      const response = await fetch('http://localhost:8000/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to generate travel plan');
      
      const data = await response.json();
      setTravelPlan(data);
    } catch (err) {
      const demoData = generateDemoData(formData);
      setTravelPlan(demoData);
      setError('Using demo data. Connect to backend for real planning.');
    } finally {
      setLoading(false);
    }
  };

  const generateDemoData = (data) => ({
    destination: data.destination || 'San Francisco',
    duration: calculateDays(data.startDate, data.endDate),
    overview: {
      totalCost: data.budget || '2500',
      travelers: data.travelers,
      startDate: data.startDate,
      endDate: data.endDate
    },
    transportation: {
      flights: {
        outbound: 'Flight to destination - $450/person',
        return: 'Return flight - $480/person',
        carRental: 'Compact SUV - $65/day from Enterprise'
      }
    },
    accommodation: {
      hotel: 'Marriott Downtown',
      location: 'City Center',
      pricePerNight: 189,
      amenities: ['Free WiFi', 'Breakfast included', 'Pool', 'Gym']
    },
    attractions: [
      {
        name: 'Golden Gate Bridge',
        type: 'Landmark',
        duration: '2-3 hours',
        cost: 'Free',
        bestTime: 'Morning for fewer crowds'
      },
      {
        name: 'Alcatraz Island',
        type: 'Historical Site',
        duration: '3-4 hours',
        cost: '$45/person',
        bestTime: 'Book 2 weeks in advance'
      },
      {
        name: 'Fisherman\'s Wharf',
        type: 'District',
        duration: '3-4 hours',
        cost: 'Free to explore',
        bestTime: 'Afternoon/Evening'
      }
    ],
    restaurants: [
      {
        name: 'Tartine Bakery',
        cuisine: 'Bakery/Café',
        specialty: 'Sourdough bread, pastries',
        priceRange: '$$',
        mustTry: 'Morning bun, Croque monsieur'
      },
      {
        name: 'Swan Oyster Depot',
        cuisine: 'Seafood',
        specialty: 'Fresh oysters, clam chowder',
        priceRange: '$$',
        mustTry: 'Dungeness crab, Boston clam chowder'
      },
      {
        name: 'Zuni Café',
        cuisine: 'Mediterranean',
        specialty: 'Wood-fired chicken',
        priceRange: '$$$',
        mustTry: 'Roast chicken for two'
      }
    ],
    activities: [
      {
        day: 1,
        morning: 'Arrive and check-in, explore neighborhood',
        afternoon: 'Golden Gate Bridge visit and walk',
        evening: 'Dinner at Fisherman\'s Wharf'
      },
      {
        day: 2,
        morning: 'Alcatraz Island tour (book ahead)',
        afternoon: 'Explore Chinatown and North Beach',
        evening: 'Sunset at Twin Peaks'
      },
      {
        day: 3,
        morning: 'Golden Gate Park museums',
        afternoon: 'Haight-Ashbury shopping',
        evening: 'Farewell dinner at Ferry Building'
      }
    ],
    localTips: [
      'Purchase a Clipper Card for public transportation',
      'Dress in layers - SF weather changes throughout the day',
      'Book Alcatraz tickets at least 2 weeks in advance',
      'Consider the CityPASS for multiple attractions'
    ]
  });

  const calculateDays = (start, end) => {
    if (!start || !end) return 3;
    const diff = new Date(end) - new Date(start);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plane className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Travel Planner
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Multi-agent AI powered trip planning with Gemini</p>
        </div>

        {/* <div className="bg-white rounded-2xl shadow-xl p-8 mb-8"> */}
        <form className="bg-white rounded-2xl shadow-xl p-8 mb-8" onSubmit={handleSubmit}>
          <div className="space-y-6"></div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination *
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="e.g., Paris, Tokyo, New York"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Users className="inline w-4 h-4 mr-1" />
                  Number of Travelers *
                </label>
                <input
                  type="number"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Budget (approx.)
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., 2500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(opt => {
                    const active = formData.interests.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1 rounded-full border ${active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} shadow-sm`}
                        aria-pressed={active}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Travel Plan'}
                </button>
              </div>

              <div className="text-sm text-gray-500">
                <Clock className="inline w-4 h-4 mr-1" />
                Estimated time: quick demo
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
          </div>
        </form>

        {travelPlan && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start gap-4">
              <Hotel className="w-8 h-8 text-purple-600" />
              <div>
                <h2 className="text-2xl font-semibold">{travelPlan.destination}</h2>
                <p className="text-gray-600">
                  {travelPlan.duration} days • {travelPlan.overview.travelers} traveler(s)
                </p>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Overview</h3>
                <p>Total cost (est): {travelPlan.overview.totalCost}</p>
                <p>Dates: {travelPlan.overview.startDate} → {travelPlan.overview.endDate}</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Top Attractions</h3>
                <ul className="space-y-2">
                  {travelPlan.attractions.map(a => (
                    <li key={a.name}>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-sm text-gray-600">{a.type} • {a.bestTime}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Accommodation</h3>
                <div>{travelPlan.accommodation.hotel}</div>
                <div className="text-sm text-gray-600">{travelPlan.accommodation.location} • ${travelPlan.accommodation.pricePerNight}/night</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Daily Activities</h3>
              <div className="space-y-4">
                {travelPlan.activities.map(act => (
                  <div key={act.day} className="p-4 border rounded-lg">
                    <div className="font-semibold">Day {act.day}</div>
                    <div className="text-sm">{act.morning}</div>
                    <div className="text-sm">{act.afternoon}</div>
                    <div className="text-sm">{act.evening}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <h3 className="font-semibold mb-2">Local Tips</h3>
              <ul className="list-disc pl-5">
                {travelPlan.localTips.map((t, idx) => <li key={idx}>{t}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
