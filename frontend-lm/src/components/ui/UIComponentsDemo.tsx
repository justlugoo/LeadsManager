import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { Alert } from './Alert';
import { LoadingSpinner } from './LoadingSpinner';

export default function UIComponentsDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <div className="min-h-screen bg-dark-900 p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-light-100 mb-8">Componentes UI Fundamentales</h1>
        {/* Buttons */}
        <Card title="Buttons" className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Card>
        {/* Inputs */}
        <Card title="Inputs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              value={inputValue}
              onChange={setInputValue}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value=""
              onChange={() => {}}
              required
            />
            <Input
              label="Con error"
              value=""
              onChange={() => {}}
              error="Este campo es requerido"
            />
            <Input
              label="Deshabilitado"
              value="No editable"
              onChange={() => {}}
              disabled
            />
          </div>
        </Card>
        {/* Badges */}
        <Card title="Badges" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="gradient">Gradient</Badge>
          </div>
        </Card>
        {/* Alerts */}
        <Card title="Alerts" className="space-y-4">
          {alertVisible && (
            <Alert 
              type="info" 
              title="Información"
              onClose={() => setAlertVisible(false)}
            >
              Este es un mensaje informativo con opción de cerrar.
            </Alert>
          )}
          <Alert type="success" title="Éxito">
            Operación completada exitosamente.
          </Alert>
          <Alert type="warning">
            Advertencia: Revisa la información antes de continuar.
          </Alert>
          <Alert type="error" title="Error">
            Ha ocurrido un error al procesar la solicitud.
          </Alert>
        </Card>
        {/* Modal */}
        <Card title="Modal" className="space-y-4">
          <Button onClick={() => setModalOpen(true)}>
            Abrir Modal
          </Button>
          <Modal 
            isOpen={modalOpen} 
            onClose={() => setModalOpen(false)}
            title="Modal de Ejemplo"
          >
            <div className="space-y-4">
              <p className="text-light-200">
                Este es el contenido del modal. Aquí puedes colocar cualquier contenido.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setModalOpen(false)}>
                  Confirmar
                </Button>
              </div>
            </div>
          </Modal>
        </Card>
        {/* Loading */}
        <Card title="Loading" className="space-y-4">
          <div className="flex items-center gap-4">
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
          </div>
        </Card>
      </div>
    </div>
  );
} 