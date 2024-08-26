// InstructionCard.tsx

interface InstructionCardProps {
  title: string;
  description: string;
}

export default function InstructionCard({ title, description }: InstructionCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-bold text-green-600 mb-2">{title}</h3>
      <p className="text-gray-800">{description}</p>
    </div>
  );
}
