import React from 'react';
import RefreshImage from './Filters/RefreshImage';
import GrayscaleFilter from './Filters/GrayscaleFilter';
import ThresholdingFilter from './Filters/ThresholdingFilter';
import DigitalNegativeFilter from './Filters/DigitalNegativeFilter';
import ContrastStretchingFilter from './Filters/ContrastStretchingFilter';
import PowerLawTransformationFilter from './Filters/PowerLawTransformationFilter';
import BitPlaneSlicingFilter from './Filters/BitPlaneSlicingFilter';
import DynamicRangeCompressionFilter from './Filters/DynamicRangeCompressionFilter';
import GrayLevelSlicingFilter from './Filters/GrayLevelSlicingFilter';
import LowPassAverageFilter from './Filters/LowPassAverageFilter';
import LowPassMedianFilter from './Filters/LowPassMedianFilter';
import HighPassFilter from './Filters/HighPassFilter';
import CustomMaskFilter from './Filters/CustomMaskFilter';

const FilterList = () => {
  return (
    <div className="w-full max-w-xs h-80 overflow-y-auto border border-gray-600 rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:text-white">
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
      <LowPassAverageFilter />
      <LowPassMedianFilter />
      <HighPassFilter />
      <CustomMaskFilter />

    </div>
  );
};

export default FilterList;