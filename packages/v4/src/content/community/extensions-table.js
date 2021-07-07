import React from 'react';
import { TableComposable, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';

export const ExtensionsTable = (props) => {
    const columns = ['Component', 'Description', 'Maintainer', 'Links'];
    const rows = props.data.map(item => {
        const links = item.links.map((link, index) => {
            return <a href={link.href} key={index} style={{padding: '.3em'}}>{link.name}</a>;
        });
        console.log(links);
        return [
            item.component,
            item.description,
            item.maintainer,
            links
        ]
    });
    console.log(rows);
    return (
        <TableComposable
            aria-label="Available components"
            variant="compact"
        >
            <Thead>
                <Tr>
                    {columns.map((column, columnIndex) => (
                        <Th key={columnIndex} modifier={columnIndex === 2 && "fitContent"}>{column}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {rows.map((row, rowIndex) => (
                    <Tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <Td key={`${rowIndex}_${cellIndex}`} dataLabel={columns[cellIndex]}>
                                {cell}
                            </Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </TableComposable>
    );
};