import React from 'react';
import {
    DataList,
    DataListItem,
    DataListItemRow,
    DataListItemCells,
    DataListCell,
    Title
} from '@patternfly/react-core';

export const ExtensionsDataList = (props) =>
(
    <DataList aria-label="Community extensions">
        {props.data.map(item => {
            const links = item.links.map((link, index) => {
                return (
                    <span key={index} className="pf-c-extensions__link">
                        <a href={link.href} target="_blank" rel="noopener noreferrer">{link.name}</a>
                    </span>
                );
            });
            return (
                <DataListItem aria-labelledby="simple-item1">
                    <DataListItemRow>
                        <DataListItemCells
                            dataListCells={[
                                <DataListCell key="primary content" width={2}>
                                    <Title headingLevel="h3">{item.component}</Title>
                                    <span className="pf-c-extensions__component-description">{item.description}</span>
                                </DataListCell>,
                                <DataListCell key="secondary content">{links}</DataListCell>
                            ]}
                        />
                    </DataListItemRow>
                </DataListItem>
            )
        })}
    </DataList>
);