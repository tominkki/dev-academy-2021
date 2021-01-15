import React, { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import {
  Flex, Box, FormHelperText, Input, InputRightElement, FormControl, Button, Table, Thead, Tbody, Tr, Th, Td, chakra
} from '@chakra-ui/react';
import { ArrowUpDownIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import nameService from '../services/name-service';
import { Name } from '../types';

interface FilterFormProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const FilterForm: React.FC<FilterFormProps> = ({ filter, setFilter }) => (
  <FormControl id='filter'>
    <Input type='text' placeholder='Filter' pr='4.5' value={filter}
      onChange={({ target }) => setFilter(target.value)}/>
    <InputRightElement w='4.5rem'>
      <Button h='1.75rem' size='sm' mt='0.3rem' bg='teal.400' color='white'
        onClick={() => setFilter('')}>
        Reset
      </Button>
    </InputRightElement>
    <FormHelperText>
      Filter nametable with name or partial name.
    </FormHelperText>
  </FormControl>
);

const NameTable: React.FC = () => {

  const [ names, setNames ] = useState<Name[]>([]);
  const [ filter, setFilter ] = useState<string>('');

  useEffect( () => {
    void (async () => {
      try {
        const responseData = await nameService.getNames();
        setNames(responseData.names);
      } catch ({ message }) {
        console.error(message);
      }
    })();
  }, []);

  const tableData: Name[] = useMemo(() => names.filter(obj => (
    obj.name.toLowerCase().includes(filter.toLowerCase()))
  ), [ names, filter ]
  );

  const columns = useMemo(() => [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Count', accessor: 'amount' }
  ] as Column<Name>[], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: tableData }, useSortBy
  );

  return (
    <Flex width='100%' justify='center' mt='2.5rem'>
      <Box maxW='3xl' borderWidth='2px' borderRadius='lg' boxShadow='base' padding='0.75rem' width='100%'>
        <FilterForm filter={filter} setFilter={setFilter}/>
        <Table {...getTableProps()} size='sm'>
          <Thead>
            {headerGroups.map(headerGroup => (
              /* eslint-disable-next-line*/
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => <Th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                  {column.render('Header')}
                  <chakra.span pl='4'>
                    {column.isSorted ?
                      column.isSortedDesc ?
                        <ArrowDownIcon/>
                        : <ArrowUpIcon/>
                      : <ArrowUpDownIcon/>
                    }
                  </chakra.span>
                </Th>
                )}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={row.index}>
                  {row.cells.map(cell => <Td {...cell.getCellProps()} key={cell.value as string}>
                    {cell.render('Cell')}
                  </Td>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default NameTable;
