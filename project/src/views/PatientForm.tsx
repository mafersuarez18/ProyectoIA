import { useState } from 'react';
import { PatientData } from '../models/PatientModel';
import { User, Scale, Ruler, Heart, Cigarette, Wine, Activity as ActivityIcon, AlertCircle } from 'lucide-react';

interface PatientFormProps {
  onSubmit: (data: Partial<PatientData>) => void;
  isLoading: boolean;
}

export const PatientForm = ({ onSubmit, isLoading }: PatientFormProps) => {
  const [formData, setFormData] = useState<Partial<PatientData>>({
    age: undefined,
    gender: undefined,
    weight: undefined,
    height: undefined,
    familyHistory: undefined,
    smokingStatus: undefined,
    alcoholConsumption: undefined,
    physicalActivity: undefined,
    previousCancerDiagnosis: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof PatientData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
        <User className="w-6 h-6 text-teal-600" />
        <span>Información del Paciente</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Edad (años)
          </label>
          <input
            type="number"
            min="0"
            max="120"
            required
            value={formData.age || ''}
            onChange={(e) => handleChange('age', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            placeholder="Ej: 45"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Género
          </label>
          <select
            required
            value={formData.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          >
            <option value="">Seleccione...</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-1">
            <Scale className="w-4 h-4 text-teal-600" />
            <span>Peso (kg)</span>
          </label>
          <input
            type="number"
            min="1"
            max="500"
            step="0.1"
            required
            value={formData.weight || ''}
            onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            placeholder="Ej: 70.5"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-1">
            <Ruler className="w-4 h-4 text-teal-600" />
            <span>Altura (cm)</span>
          </label>
          <input
            type="number"
            min="50"
            max="300"
            step="0.1"
            required
            value={formData.height || ''}
            onChange={(e) => handleChange('height', parseFloat(e.target.value))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            placeholder="Ej: 170"
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-8 mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
          <Heart className="w-5 h-5 text-teal-600" />
          <span>Historial Médico y Hábitos</span>
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              ¿Tiene historial familiar de cáncer?
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleChange('familyHistory', true)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.familyHistory === true
                    ? 'border-teal-600 bg-teal-50 text-teal-700 font-semibold'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                }`}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => handleChange('familyHistory', false)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.familyHistory === false
                    ? 'border-teal-600 bg-teal-50 text-teal-700 font-semibold'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-1">
              <Cigarette className="w-4 h-4 text-teal-600" />
              <span>Estado de fumador</span>
            </label>
            <select
              required
              value={formData.smokingStatus || ''}
              onChange={(e) => handleChange('smokingStatus', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            >
              <option value="">Seleccione...</option>
              <option value="never">Nunca he fumado</option>
              <option value="former">Ex fumador</option>
              <option value="current">Fumador actual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-1">
              <Wine className="w-4 h-4 text-teal-600" />
              <span>Consumo de alcohol</span>
            </label>
            <select
              required
              value={formData.alcoholConsumption || ''}
              onChange={(e) => handleChange('alcoholConsumption', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            >
              <option value="">Seleccione...</option>
              <option value="none">No consumo</option>
              <option value="moderate">Consumo moderado</option>
              <option value="high">Consumo alto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-1">
              <ActivityIcon className="w-4 h-4 text-teal-600" />
              <span>Nivel de actividad física</span>
            </label>
            <select
              required
              value={formData.physicalActivity || ''}
              onChange={(e) => handleChange('physicalActivity', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            >
              <option value="">Seleccione...</option>
              <option value="sedentary">Sedentario</option>
              <option value="moderate">Moderado</option>
              <option value="active">Activo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-1">
              <AlertCircle className="w-4 h-4 text-teal-600" />
              <span>¿Ha tenido un diagnóstico previo de cáncer?</span>
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleChange('previousCancerDiagnosis', true)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.previousCancerDiagnosis === true
                    ? 'border-teal-600 bg-teal-50 text-teal-700 font-semibold'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                }`}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => handleChange('previousCancerDiagnosis', false)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.previousCancerDiagnosis === false
                    ? 'border-teal-600 bg-teal-50 text-teal-700 font-semibold'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-4 px-6 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Calculando riesgo...</span>
          </span>
        ) : (
          'Calcular Riesgo'
        )}
      </button>
    </form>
  );
};
