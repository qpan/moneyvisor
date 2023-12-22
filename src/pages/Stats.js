import { Box, Grid, Tab, Tabs } from "@mui/material";
import DatePaginator from "../components/DatePaginator";
import TabPanel from "../components/TabPanel";
import { useFetchEntriesByYearMonth } from "../hooks/use-fetch-entries-by-year-month";
import { capitalize, isEmpty, map } from "lodash";
import { VictoryPie } from 'victory';
import { victoryColorScaleArray } from "../utils";
import { useState } from "react";
import { ENTRY } from "../constants";
import currency from "currency.js";
import CategoriesTable from "../components/CategoriesTable";
import NoDataPlaceholder from "../components/NoDataPlaceholder";
const math = require('mathjs');

function Stats() {
  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { data: entryData } = useFetchEntriesByYearMonth()
  const data = {};

  entryData?.forEach((entry) => {
    /**
     * data: {}
     */
    data[entry.type.name] ??= {};

    /**
     * data: {
     *   income: {
     *    id: 1,
     *    name: 'income',
     *    categories: {},
     *    metadata: { total: 0 }
     *   }
     * }
     */
    data[entry.type.name].id ??= entry.typeId;
    data[entry.type.name].name ??= entry.type.name;
    data[entry.type.name].categories ??= {};
    data[entry.type.name].metadata ??= { total: 0 };
    if (data[entry.type.name].id === entry.typeId) {
      data[entry.type.name].metadata.total += entry.amount;
    }

    /**
     * data: {
     *   income: {
     *    id: 1,
     *    name: 'income',
     *    categories: {
     *      salary: {
     *        id: 1,
     *        name: 'salary',
     *        emoji: '1F3E6',
     *        metadata: { total: 0 }
     *      }
     *    },
     *    metadata: { total: 0 }
     *   }
     * }
     */
    data[entry.type.name].categories[entry.category.name] ??= {};
    data[entry.type.name].categories[entry.category.name].id ??= entry.categoryId;
    data[entry.type.name].categories[entry.category.name].name ??= entry.category.name;
    data[entry.type.name].categories[entry.category.name].emoji ??= entry.category.emoji;
    data[entry.type.name].categories[entry.category.name].metadata ??= { total: 0 };
    if (data[entry.type.name].categories[entry.category.name].id === entry.categoryId) {
      data[entry.type.name].categories[entry.category.name].metadata.total += entry.amount;
    }

    /**
     * data: {
     *   income: {
     *    id: 1,
     *    name: 'income',
     *    categories: {
     *      salary: {
     *        id: 1,
     *        name: 'salary',
     *        entries: [{}, {}, {}]
     *        emoji: '1F3E6',
     *        metadata: { total: 0 }
     *      }
     *    },
     *    metadata: { total: 0 }
     *   }
     * }
     */
    data[entry.type.name].categories[entry.category.name].entries ??= [];
    data[entry.type.name].categories[entry.category.name].entries.push(entry);
  });

  const incomeCategoryPieData = map(data?.income?.categories, (category) => {
    return {
      x: `${capitalize(category.name)}
          ${
            math
              .chain(category.metadata.total)
              .divide(data.income.metadata.total)
              .multiply(100)
              .round(2)
          } %
      `,
      y: category.metadata.total
    };
  });

  const expenseCategoryPieData = map(data?.expense?.categories, (category) => {
    return {
      x: `${capitalize(category.name)}
          ${
            math
              .chain(category.metadata.total)
              .divide(data.expense.metadata.total)
              .multiply(100)
              .round(2)
          } %
      `,
      y: category.metadata.total
    };
  });

  return (
    <Grid>
      <DatePaginator />
      <Box sx={{ width: '100%', backgroundColor: 'background.paper' }}>
        <Tabs
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          centered
          sx={{
            '.MuiTabs-indicator': {
              backgroundColor: value === 0 ? 'success.main': 'error.main',
            },
            '.MuiButtonBase-root.Mui-selected': {
              color: value === 0 ? 'success.main': 'error.main',
            }
          }}
        >
          <Tab label={`
              ${ENTRY.INCOME}
              (${currency(data?.income?.metadata?.total, { separator: ',', symbol: '$' }).format()})
            `}
          />
          <Tab label={`
              ${ENTRY.EXPENSE}
              (${currency(data?.expense?.metadata?.total, { separator: ',', symbol: '$' }).format()})
            `}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            {isEmpty(incomeCategoryPieData) && (
              <Box sx={{ marginTop: '84px'}}>
                <NoDataPlaceholder />
              </Box>
            )}
            {!isEmpty(incomeCategoryPieData) && (
              <VictoryPie
                width={800}
                animate={{ duration: 100 }}
                colorScale={victoryColorScaleArray}
                data={incomeCategoryPieData}
              />
            )}
          </Grid>
          <br />
          <Grid item xs={12} sm={6} md={6}>
            <CategoriesTable data={data?.income} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            {isEmpty(expenseCategoryPieData) && (
              <Box sx={{ marginTop: '84px'}}>
                <NoDataPlaceholder />
              </Box>
            )}
            {!isEmpty(expenseCategoryPieData) && (
              <VictoryPie
                width={800}
                animate={{ duration: 100 }}
                colorScale={victoryColorScaleArray}
                data={expenseCategoryPieData}
              />
            )}
          </Grid>
          <br />
          <Grid item xs={12} sm={6} md={6}>
            <CategoriesTable data={data?.expense} />
          </Grid>
        </Grid>
      </TabPanel>
    </Grid>
  );
}

export default Stats;