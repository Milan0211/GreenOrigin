import { useState } from 'react';
import { MapPin, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '../lib/utils';
import Badge from './ui/Badge';
import { Card, CardContent } from './ui/Card';

const EventTimeline = ({ events = [] }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const toggleEvent = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case 'farmer':
        return '🌱';
      case 'processor':
        return '⚙️';
      case 'lab':
        return '🔬';
      case 'distributor':
        return '🚚';
      default:
        return '📍';
    }
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'farmer':
        return 'bg-emerald-100 text-emerald-800';
      case 'processor':
        return 'bg-blue-100 text-blue-800';
      case 'lab':
        return 'bg-purple-100 text-purple-800';
      case 'distributor':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-earth-100 text-earth-800';
    }
  };

  if (!events || events.length === 0) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-earth-600">No events found for this product.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold text-earth-900 mb-6">Product Journey</h3>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline line */}
              {index < events.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-earth-200"></div>
              )}
              
              {/* Event content */}
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${getRoleColor(event.role)}`}>
                    {getRoleIcon(event.role)}
                  </div>
                </div>
                
                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getRoleColor(event.role)}>
                        {event.role}
                      </Badge>
                      <span className="text-sm text-earth-600">
                        {formatDate(event.date)}
                      </span>
                    </div>
                    {event.details && (
                      <button
                        onClick={() => toggleEvent(event.id)}
                        className="p-1 hover:bg-earth-100 rounded transition-colors"
                      >
                        {expandedEvent === event.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  <h4 className="text-base font-medium text-earth-900 mt-1">
                    {event.description}
                  </h4>
                  
                  <div className="flex items-center text-sm text-earth-600 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.locationName}
                  </div>
                  
                  {/* Expanded details */}
                  {expandedEvent === event.id && event.details && (
                    <div className="mt-3 p-3 bg-earth-50 rounded-lg">
                      <p className="text-sm text-earth-700">{event.details}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventTimeline;
