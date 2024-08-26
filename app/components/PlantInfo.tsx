interface PlantInfoProps {
  info: string;
  imageUrl: string;
}

export default function PlantInfo({ info, imageUrl }: PlantInfoProps) {
  const parseInfo = (text: string) => {
    console.log(text)
    const lines = text.split('\n\n');

    console.log(lines)
    const stripMarkdown = (line: string) => {
      return line.replace(/[*_]/g, '').trim();
    };

    const getValueAfterColon = (line: string) => stripMarkdown(line.split(':').slice(1).join(':').trim() || 'Unknown');

    return {
      commonName: getValueAfterColon(lines.find(l => l.toLowerCase().includes('common name')) || 'Unknown'),
      scientificName: getValueAfterColon(lines.find(l => l.toLowerCase().includes('scientific name:')) || 'Unknown'),
      description: getValueAfterColon(lines.find(l => l.toLowerCase().includes('description:')) || 'No description available'),
      nativeRegion: getValueAfterColon(lines.find(l => l.toLowerCase().includes('native region:')) || 'Unknown'),
      growingConditions: getValueAfterColon(lines.find(l => l.toLowerCase().includes('ideal growing conditions:')) || 'Unknown'),
      careTips: getValueAfterColon(lines.find(l => l.toLowerCase().includes('care tips:')) || 'No care tips available'),
    };
  };

  const { commonName, scientificName, description, nativeRegion, growingConditions, careTips } = parseInfo(info);

  console.log(commonName)
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img src={imageUrl} alt={commonName} className="w-full h-auto rounded-lg shadow-md object-cover" style={{ maxHeight: '300px' }} />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-green-600 mb-2">{commonName}</h2>
          <p className="text-xl text-gray-600 italic mb-4">{scientificName}</p>
          <p className="text-gray-800 mb-4">{description}</p>
          
          <h3 className="text-xl font-semibold text-green-600 mb-2">Plant Details</h3>
          <table className="w-full border-collapse mb-4">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-semibold text-black">Native Region</td>
                <td className="py-2 text-black">{nativeRegion}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold text-black">Growing Conditions</td>
                <td className="py-2 text-black">{growingConditions}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-black">Care Tips</td>
                <td className="py-2 text-black">{careTips}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
