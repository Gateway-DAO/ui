import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete } from '@mui/material';

const categories = [
  'Blockchain Architecture',
  'Cryptography',
  'Data Structures',
  'Smart Contracts',
  'Web Development',
  'Solidity',
  'Rust',
  'Security Architecht',
  'Machine Learning',
  'Data Science',
  'Marketing',
  'Blockchain',
  'Finance',
  'Sales',
  'Analyst',
  'Research',
  'Operations',
  'Human Capital',
  'Front End',
  'UX Designer',
  'UI Designer',
  'Full Stack',
  'Legal',
  'Compliance',
  'Accounting',
  'Community',
  'Project Management',
  'Product Management',
  'Tokenomics',
  'Quality Assurance',
  'Branding',
  'Copywriting/Messaging',
  'Fundraising',
  'Investing',
  'Strategy',
  'Teachable',
  'Collaboration',
  'Creative',
  'Communication',
  'Leader',
  'Organization',
  'Fast Paced/Dynamic',
  'Logical Thinking',
  'Problem Solving',
  'Proactive',
  'Attention to Detail',
  'Curious',
  'Entreprenurial',
  'Versatile',
  'Decisive',
  'Reliable',
  'Multitasking',
  'Agile Working',
  'Passionate',
  'Prioritizes',
  'Strategic',
  'Transparent',
];

export const CategoriesInput = ({ set, ...props }) => {
  return (
    <Autocomplete
      multiple
      id="categories-input"
      options={categories}
      popupIcon={<Search />}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            key={index}
            variant="filled"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Categories" id="categories" {...props} />
      )}
      onChange={(event, categories) => set(categories)}
    />
  );
};

export default CategoriesInput;
