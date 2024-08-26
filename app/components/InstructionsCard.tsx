// InstructionsCard.tsx
import InstructionCard from './InstructionCard';

export default function InstructionsCard() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 max-w-6xl w-full mb-8">
      <InstructionCard 
        title="Upload a Plant Image" 
        description="Click the 'Upload Plant Image' button and select a clear picture of the plant you want to identify." 
      />
      <InstructionCard 
        title="Wait for Identification" 
        description="The app will analyze the image and identify the plant, providing detailed information including its common name, scientific name, and care tips." 
      />
      <InstructionCard 
        title="Explore the Details" 
        description="View the detailed information about the plant and learn more about its growing conditions, care requirements, and more." 
      />
    </div>
  );
}
