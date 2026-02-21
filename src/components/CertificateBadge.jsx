import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import Badge from './ui/Badge';

const CertificateBadge = ({ certificate }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pass':
        return <CheckCircle className="h-4 w-4" />;
      case 'fail':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pass':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'fail':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-earth-100 text-earth-800 border-earth-200';
    }
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(certificate.status)}`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon(certificate.status)}
        <div>
          <div className="font-medium text-sm">{certificate.type}</div>
          {certificate.value && (
            <div className="text-xs opacity-75">
              {certificate.value} {certificate.limit && `(${certificate.limit})`}
            </div>
          )}
        </div>
      </div>
      <Badge status={certificate.status} className="text-xs">
        {certificate.status}
      </Badge>
    </div>
  );
};

export default CertificateBadge;
