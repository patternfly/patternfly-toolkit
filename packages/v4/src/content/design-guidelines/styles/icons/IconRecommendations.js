import React from 'react';
import {
  Divider,
  InputGroup,
  TextInput, 
  Title, 
  Button,
  ButtonVariant,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  EmptyState, 
  EmptyStateVariant, 
  EmptyStateIcon, 
  EmptyStateBody,
  Spinner
} from '@patternfly/react-core';
const icons = require('@patternfly/react-icons/dist/esm/icons/index.js');
import './icons.css';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
  sortable,
  SortByDirection
} from '@patternfly/react-table';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';
import { recommendationsArray } from './icon-migrations';
import faArrowCircleODown from './fa-arrow-circle-o-down.svg';
import faArrowCircleOUp from './fa-arrow-circle-o-up.svg';
import faClockO from './fa-clock-o.svg';
import faColumns from './fa-columns.svg';
import faTable from './fa-table.svg';
import faTachometer from './fa-tachometer.svg';
import faThLarge from './fa-th-large.svg';
import faTh from './fa-th.svg';
import pfIconHistory from './pf-icon-history.svg';
import pficonKey from './pficon-key.svg';
import pficonSearch from './pficon-search.svg';
import pficonSettings from './pficon-settings.svg';

const iconSvgs = {
  'fa-arrow-circle-o-down': faArrowCircleODown,
  'fa-arrow-circle-o-up': faArrowCircleOUp,
  'fa-clock-o': faClockO,
  'fa-columns': faColumns,
  'fa-table': faTable,
  'fa-tachometer': faTachometer,
  'fa-th-large': faThLarge,
  'fa-th': faTh,
  'pf-icon-history': pfIconHistory,
  'pficon-key': pficonKey,
  'pficon-search': pficonSearch,
  'pficon-settings': pficonSettings
};

export class IconRecommendations extends React.Component {
  state = {
    searchValue: '',
    columns: [
      { title: 'Old icon', transforms: [sortable], props: { className: css(styles.modifiers.fitContent)} },
      { title: 'Updated icon', transforms: [sortable], props: { className: css(styles.modifiers.fitContent)} },
      'Contextual usage'
    ],
    sortBy: {}
  };

  handleSearchChange = (checked, event) => {
    const searchValue = event.target.value;
    this.setState(() => ({
      searchValue
    }));
  };

  onSort = (_event, index, direction) => {
    this.setState({
      sortBy: {
        index,
        direction
      }
    });
  }

  buildRecommendationRows = (searchTerm) => recommendationsArray.filter(recGroup => recGroup
    .some(obj => Object.values(obj).some(val => {
      const cellText = val?.props?.children ? val.props.children : val;
      return cellText.indexOf(searchTerm) > -1;
    })))
    .map(iconRow => iconRow
      .reduce((acc, cur) => {
        acc[cur.iconType].push({
          name: cur.iconName,
          icon: cur.iconName,
          style: cur.style,
          reactIcon: cur.reactIcon
        });
        if (cur.iconType === 'new') {
          acc['iconUsage'].push(<div>{cur.iconUsage}</div>);
        }
        return acc;
      }, {
        old: [],
        new: [],
        iconUsage: []
      })
    );

  render() {
    const { searchValue, columns, sortBy } = this.state;
    const { direction, index } = sortBy;
    const SearchIcon = icons.SearchIcon;
    const iconRecommendations = this.buildRecommendationRows(searchValue);
    let iconRows = iconRecommendations.map((rowObj, idx) => {
      const columnNames = Object.keys(rowObj);
      const cells = columnNames.map(columnName => { // old
        const cellObj = {
          title: [],
          key: `${columnName}-${idx}`
        }; 
        rowObj[columnName].map((cellLine, index) => {
          const { icon, name, reactIcon } = cellLine;
          const Icon = reactIcon !== 'svg' && icons[reactIcon];
          const iconSvg = reactIcon === 'svg' && <img src={iconSvgs[name]} className="ws-icon-svg" alt={`${icon} icon`} />;
          const SpinnerComponent = reactIcon === 'PF-Spinner-Component';
          
          (columnName === 'iconUsage')
            ? cellObj.title.push(<div className="ws-recommendations-entry" key={`${name}-${index}`}>{cellLine}</div>)
            : cellObj.title.push(<div className={`${css(styles.modifiers.fitContent)} ws-recommendations-entry`} key={`${name}-${index}`}>
              <span className="ws-recommendations-icon">
                {Icon && <Icon />}
                {iconSvg}
                {SpinnerComponent && <Spinner size='md' />}
              </span>
              {icon}
            </div>);

          return null;
        });
        return cellObj;
      });
      return cells;
    });

    if (direction) {
      const sortedRows = iconRows.sort((a, b) => {
        const cellA = a[index].title[0].key.toLowerCase();
        const cellB = b[index].title[0].key.toLowerCase();
        return cellA < cellB
          ? -1
          : cellA > cellB
            ? 1 : 0});
      iconRows = direction === SortByDirection.asc ? sortedRows : sortedRows.reverse();
    }
    
    return (
      <div>
        <Toolbar id="data-toolbar-recs">
          <ToolbarContent>
            <ToolbarItem>
              <InputGroup>
                <TextInput
                  name="recommendedIconsSearch"
                  id="recommendedIconsSearch" type="search"
                  aria-label="Search icons"
                  placeholder="Search for any icon or usage guideline"
                  value={searchValue}
                  onChange={this.handleSearchChange}
                />
                <Button variant={ButtonVariant.control} aria-label="search button for search input">
                  <SearchIcon />
                </Button>
              </InputGroup>
            </ToolbarItem>
            <ToolbarItem alignment={{ default: 'alignRight' }}>
              <b>{iconRows.length} items</b>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        <Divider />
        <Table
          aria-label="Updated icons table"
          cells={columns}
          rows={iconRows}
          className="ws-icons-recommendations"
          sortBy={sortBy}
          onSort={this.onSort}
          variant={TableVariant.compact}
        >
          <TableHeader />
          <TableBody />
        </Table>

          {iconRows.length === 0 && (
          <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateIcon icon={icons.SearchIcon}/>
            <Title headingLevel="h5" size="2xl">
              No results found for "{ searchValue }".
            </Title>
            <EmptyStateBody>
              We couldn't find any icons that matched your search. Try entering a new search term to find what you're looking for.
            </EmptyStateBody>
          </EmptyState>
        )}
      </div>
    );
  }
}
