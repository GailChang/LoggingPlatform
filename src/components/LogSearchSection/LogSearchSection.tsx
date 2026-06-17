import { 
  AccordionProps,
  Box,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import SearchSection from "../SearchSection";
import { ELogType, ELevel } from "@/domain/logs/schema";
import { useFilterStore, updateFilterGroup } from "@/domain/filter/store";

const sourceSystemOption = [
  {
    value: '服務A',
    label: '服務A'
  },
  {
    value: '服務B',
    label: '服務B'
  },
  {
    value: '服務C',
    label: '服務C'
  }
]
const levelOption = Object.entries(ELevel).map(([key, value]) => ({
  value,
  label: key,
}))

const typeOption = Object.entries(ELogType).map(([key, value]) => ({
  value,
  label: key,
}))

export default function LogSearchSection({defaultExpanded, ...props}: Omit<AccordionProps, 'children'>){
  const { sourceSystem, level, keyword } = useFilterStore(state => state.filterGroup)

  return (
    <SearchSection defaultExpanded = {defaultExpanded}
      {...props}
    >
      <Box component="form">
        <Grid container spacing={2}>
          <Grid size={3}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="select-source-system-label">所屬服務</InputLabel>
              <Select
                labelId="select-source-system-label"
                id="select-source-system"
                value={sourceSystem ?? ''}
                onChange={(e) => updateFilterGroup({ sourceSystem: e.target.value })}
                label="所屬服務"
              >
                {sourceSystemOption.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="select-level-label">分級</InputLabel>
              <Select
                labelId="select-level-label"
                id="select-level"
                value={level ?? ''}
                onChange={(e) => updateFilterGroup({ level: e.target.value as typeof level })}
                label="分級"
              >
                {levelOption.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              sx={{ m: 1 }}
              id="input-keyword"
              value={keyword ?? ''}
              onChange={(e) => updateFilterGroup({ keyword: e.target.value })}
              label="文字搜尋"
            />
          </Grid>
          
        </Grid>
      </Box>
    </SearchSection>
  )
}