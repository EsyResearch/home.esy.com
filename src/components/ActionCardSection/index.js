import ActionCard from './actionCard';
import { ClipboardList, BookOpen, Clock, Lightbulb } from 'lucide-react';

const ActionCards = () => {
    const cards = [
      {
        icon: <ClipboardList size={24} />,
        title: 'Start from Outline',
        description: 'Build your essay structure first',
        color: 'purple'
      },
      {
        icon: <BookOpen size={24} />,
        title: 'Essay Templates',
        description: 'Choose from proven formats',
        color: 'indigo'
      },
      {
        icon: <Clock size={24} />,
        title: 'Continue Writing',
        description: 'Pick up where you left off',
        color: 'green'
      },
      {
        icon: <Lightbulb size={24} />,
        title: 'Get Inspired',
        description: 'Browse example essays',
        color: 'amber'
      }
    ];
  
    return (
      <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto mb-16 animate-fadeIn animation-delay-400">
        {cards.map((card, index) => (
          <ActionCard key={index} {...card} />
        ))}
      </div>
    );
  };

  export default ActionCards;