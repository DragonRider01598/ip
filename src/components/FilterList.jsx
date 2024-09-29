import React from 'react';
import RefreshImage from './Filters/RefreshImage';
import GrayscaleFilter from './Filters/GrayscaleFilter';
import ThresholdingFilter from './Filters/ThresholdingFilter';
import DigitalNegativeFilter from './Filters/DigitalNegativeFilter';
import ContrastStretchingFilter from './Filters/ContrastStretchingFilter ';
import PowerLawTransformationFilter from './Filters/PowerLawTransformationFilter ';
import BitPlaneSlicingFilter from './Filters/BitPlaneSlicingFilter ';
import DynamicRangeCompressionFilter from './Filters/DynamicRangeCompressionFilter ';
import GrayLevelSlicingFilter from './Filters/GrayLevelSlicingFilter ';

const FilterList = () => {
  return (
    <div className="w-full max-w-xs h-80 overflow-y-auto border border-gray-300 rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Image Filters</h2>

      <RefreshImage />
      <DigitalNegativeFilter />
      <GrayscaleFilter />
      <ThresholdingFilter />
      <ContrastStretchingFilter />
      <PowerLawTransformationFilter />
      <BitPlaneSlicingFilter />
      <DynamicRangeCompressionFilter />
      <GrayLevelSlicingFilter />

    </div>
  );
};

export default FilterList;