import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from 'theme-patternfly-org/components';
import { BellIcon, CogIcon, FilterIcon, TrashIcon, HelpIcon } from '@patternfly/react-icons';
import imgBrand from '@patternfly/react-core/src/demos/PageLayout/examples/imgBrand.svg';
import imgAvatar from '@patternfly/react-core/src/demos/PageLayout/examples/imgAvatar.svg';
import pfIcon from '../../../../../../../node_modules/@patternfly/react-core/src/demos/CardView/examples/./pf-logo-small.svg';
import activeMQIcon from '../../../../../../../node_modules/@patternfly/react-core/src/demos/CardView/examples/./activemq-core_200x150.png';
import avroIcon from '../../../../../../../node_modules/@patternfly/react-core/src/demos/CardView/examples/./camel-avro_200x150.png';
import dropBoxIcon from '../../../../../../../node_modules/@patternfly/react-core/src/demos/CardView/examples/./camel-dropbox_200x150.png';
import infinispanIcon from '../../../../../../../node_modules/@patternfly/react-core/src/demos/CardView/examples/./camel-infinispan_200x150.png';
import saxonIcon from '../../../../../../../node_modules/@patternfly/react-core/src/demos/CardView/examples/./camel-saxon_200x150.png';
import sparkIcon from '../../../../../../../node_modules/@patternfly/react-core/src/demos/CardView/examples/./camel-spark_200x150.png';
import swaggerIcon from '../../../../../../../node_modules/@patternfly/react-core/src/demos/CardView/examples/./camel-swagger-java_200x150.png';
import azureIcon from '../../../../../../../node_modules/@patternfly/react-core/src/demos/CardView/examples/./FuseConnector_Icons_AzureServices.png';
import restIcon from '../../../../../../../node_modules/@patternfly/react-core/src/demos/CardView/examples/./FuseConnector_Icons_REST.png';

export const DocumentationDemosCardViewReactDocs = {
  "slug": "/documentation/demos/card-view/react",
  "source": "react",
  "sourceLink": "https://github.com/patternfly/patternfly-react/blob/master/packages/react-core/src/demos/CardView/examples/CardView.md",
  "section": "demos",
  "id": "Card view",
  "title": "Card view",
  "toc": [
    "Examples"
  ]
};
DocumentationDemosCardViewReactDocs.liveContext = {
  BellIcon,
  CogIcon,
  FilterIcon,
  TrashIcon,
  HelpIcon,
  imgBrand,
  imgAvatar,
  pfIcon,
  activeMQIcon,
  avroIcon,
  dropBoxIcon,
  infinispanIcon,
  saxonIcon,
  sparkIcon,
  swaggerIcon,
  azureIcon,
  restIcon
};
DocumentationDemosCardViewReactDocs.Component = () => (
  <React.Fragment>
    <p {...{"className":"ws-p"}}>
      {`This is a demo that showcases Patternfly cards.`}
    </p>
    <AutoLinkHeader {...{"size":"h2","className":"ws-title ws-h2"}}>
      {`Examples`}
    </AutoLinkHeader>
    <Example {...DocumentationDemosCardViewReactDocs} {...{"code":"import React from 'react';\nimport {\n  Avatar,\n  Brand,\n  Button,\n  ButtonVariant,\n  Card,\n  CardHeader,\n  CardActions,\n  CardTitle,\n  CardBody,\n  Checkbox,\n  Dropdown,\n  DropdownGroup,\n  DropdownToggle,\n  DropdownItem,\n  DropdownSeparator,\n  DropdownPosition,\n  DropdownDirection,\n  DropdownToggleCheckbox,\n  Gallery,\n  GalleryItem,\n  KebabToggle,\n  Nav,\n  NavItem,\n  NavList,\n  OverflowMenu,\n  OverflowMenuControl,\n  OverflowMenuDropdownItem,\n  OverflowMenuItem,\n  Page,\n  PageHeader,\n  PageHeaderTools,\n  PageHeaderToolsGroup,\n  PageHeaderToolsItem,\n  PageSection,\n  PageSectionVariants,\n  PageSidebar,\n  Pagination,\n  Select,\n  SelectOption,\n  SkipToContent,\n  TextContent,\n  Text,\n  Toolbar,\n  ToolbarGroup,\n  ToolbarItem,\n  ToolbarFilter,\n  ToolbarContent,\n  ToolbarToggleGroup\n} from '@patternfly/react-core';\nimport { BellIcon, CogIcon, FilterIcon, TrashIcon, HelpIcon } from '@patternfly/react-icons';\nimport imgBrand from '@patternfly/react-core/src/demos/PageLayout/examples/imgBrand.svg';\nimport imgAvatar from '@patternfly/react-core/src/demos/PageLayout/examples/imgAvatar.svg';\nimport pfIcon from './pf-logo-small.svg';\nimport activeMQIcon from './activemq-core_200x150.png';\nimport avroIcon from './camel-avro_200x150.png';\nimport dropBoxIcon from './camel-dropbox_200x150.png';\nimport infinispanIcon from './camel-infinispan_200x150.png';\nimport saxonIcon from './camel-saxon_200x150.png';\nimport sparkIcon from './camel-spark_200x150.png';\nimport swaggerIcon from './camel-swagger-java_200x150.png';\nimport azureIcon from './FuseConnector_Icons_AzureServices.png';\nimport restIcon from './FuseConnector_Icons_REST.png';\n\nclass CardViewBasic extends React.Component {\n  constructor(props) {\n    super(props);\n\n    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);\n\n    this.state = {\n      filters: {\n        products: []\n      },\n      res: [],\n      selectedItems: [],\n      areAllSelected: false,\n      itemsCheckedByDefault: false,\n      isUpperToolbarDropdownOpen: false,\n      isUpperToolbarKebabDropdownOpen: false,\n      isLowerToolbarDropdownOpen: false,\n      isLowerToolbarKebabDropdownOpen: false,\n      isCardKebabDropdownOpen: false,\n      activeItem: 0,\n      splitButtonDropdownIsOpen: false,\n      page: 1,\n      perPage: 10,\n      totalItemCount: 10\n    };\n\n    this.onPageDropdownToggle = isUpperToolbarDropdownOpen => {\n      this.setState({\n        isUpperToolbarDropdownOpen\n      });\n    };\n\n    this.onPageDropdownSelect = event => {\n      this.setState({\n        isUpperToolbarDropdownOpen: !this.state.isUpperToolbarDropdownOpen\n      });\n    };\n\n    this.onPageToolbarDropdownToggle = isPageToolbarDropdownOpen => {\n      this.setState({\n        isPageToolbarDropdownOpen\n      });\n    };\n\n    this.onPageToolbarKebabDropdownToggle = isUpperToolbarKebabDropdownOpen => {\n      this.setState({\n        isUpperToolbarKebabDropdownOpen\n      });\n    };\n\n    this.onToolbarDropdownToggle = isLowerToolbarDropdownOpen => {\n      this.setState(prevState => ({\n        isLowerToolbarDropdownOpen\n      }));\n    };\n\n    this.onToolbarDropdownSelect = event => {\n      this.setState({\n        isLowerToolbarDropdownOpen: !this.state.isLowerToolbarDropdownOpen\n      });\n    };\n\n    this.onToolbarKebabDropdownToggle = isLowerToolbarKebabDropdownOpen => {\n      this.setState({\n        isLowerToolbarKebabDropdownOpen\n      });\n    };\n\n    this.onToolbarKebabDropdownSelect = event => {\n      this.setState({\n        isLowerToolbarKebabDropdownOpen: !this.state.isLowerToolbarKebabDropdownOpen\n      });\n    };\n\n    this.onCardKebabDropdownToggle = (key, isCardKebabDropdownOpen) => {\n      this.setState({\n        [key]: isCardKebabDropdownOpen\n      });\n    };\n\n    this.onCardKebabDropdownSelect = (key, event) => {\n      this.setState({\n        [key]: !this.state[key]\n      });\n    };\n\n    this.onNavSelect = result => {\n      this.setState({\n        activeItem: result.itemId\n      });\n    };\n\n    this.deleteItem = item => event => {\n      const filter = getter => val => getter(val) !== item.id;\n      this.setState({\n        res: this.state.res.filter(filter(({ id }) => id)),\n        selectedItems: this.state.selectedItems.filter(filter(id => id))\n      });\n    };\n\n    this.onSetPage = (_event, pageNumber) => {\n      this.setState({\n        page: pageNumber\n      });\n    };\n\n    this.onPerPageSelect = (_event, perPage) => {\n      this.setState({\n        perPage\n      });\n    };\n\n    this.onSplitButtonToggle = isOpen => {\n      this.setState({\n        splitButtonDropdownIsOpen: isOpen\n      });\n    };\n\n    this.onSplitButtonSelect = event => {\n      this.setState((prevState, props) => {\n        return { splitButtonDropdownIsOpen: !prevState.splitButtonDropdownIsOpen };\n      });\n    };\n\n    this.onNameSelect = (event, selection) => {\n      const checked = event.target.checked;\n      this.setState(prevState => {\n        const prevSelections = prevState.filters['products'];\n        return {\n          filters: {\n            ...prevState.filters,\n            ['products']: checked ? [...prevSelections, selection] : prevSelections.filter(value => value !== selection)\n          }\n        };\n      });\n    };\n\n    this.onDelete = (type = '', id = '') => {\n      if (type) {\n        this.setState(prevState => {\n          prevState.filters[type.toLowerCase()] = prevState.filters[type.toLowerCase()].filter(s => s !== id);\n          return {\n            filters: prevState.filters\n          };\n        });\n      } else {\n        this.setState({\n          filters: {\n            products: []\n          }\n        });\n      }\n    };\n  }\n\n  selectedItems(e) {\n    const { value, checked } = e.target;\n    let { selectedItems } = this.state;\n\n    if (checked) {\n      selectedItems = [...selectedItems, value];\n    } else {\n      selectedItems = selectedItems.filter(el => el !== value);\n      if (this.state.areAllSelected) {\n        this.setState({\n          areAllSelected: !this.state.areAllSelected\n        });\n      }\n    }\n    this.setState({ selectedItems });\n  }\n\n  splitCheckboxSelectAll(e) {\n    const { checked } = e.target;\n    const { isChecked, res } = this.state;\n    let collection = [];\n\n    if (checked) {\n      for (var i = 0; i <= 9; i++) collection = [...collection, i];\n    }\n\n    this.setState(\n      {\n        selectedItems: collection,\n        isChecked: isChecked,\n        areAllSelected: checked\n      },\n      this.updateSelected\n    );\n  }\n\n  selectPage(e) {\n    const { checked } = e.target;\n    const { isChecked, totalItemCount, perPage } = this.state;\n    let collection = [];\n\n    collection = this.getAllItems();\n\n    this.setState(\n      {\n        selectedItems: collection,\n        isChecked: checked,\n        areAllSelected: totalItemCount === perPage ? true : false\n      },\n      this.updateSelected\n    );\n  }\n\n  selectAll(e) {\n    const { checked } = e.target;\n    const { isChecked } = this.state;\n\n    let collection = [];\n    for (var i = 0; i <= 9; i++) collection = [...collection, i];\n\n    this.setState(\n      {\n        selectedItems: collection,\n        isChecked: true,\n        areAllSelected: true\n      },\n      this.updateSelected\n    );\n  }\n\n  selectNone(e) {\n    const { checked } = e.target;\n    const { isChecked, selectedItems } = this.state;\n    this.setState(\n      {\n        selectedItems: [],\n        isChecked: false,\n        areAllSelected: false\n      },\n      this.updateSelected\n    );\n  }\n\n  getAllItems() {\n    const { res } = this.state;\n    const collection = [];\n    for (const items of res) {\n      collection.push(items.id);\n    }\n\n    return collection;\n  }\n\n  handleCheckboxClick(checked, e) {\n    const { value } = e.target;\n    const { totalItemCount } = this.state;\n\n    if (checked) {\n      const collection = this.getAllItems();\n      this.setState(prevState => ({\n        selectedItems: [...prevState.selectedItems, value * 1],\n        areAllSelected: totalItemCount === prevState.selectedItems.length + 1\n      }));\n    } else {\n      this.setState(prevState => ({\n        selectedItems: prevState.selectedItems.filter(item => item != value),\n        areAllSelected: false\n      }));\n    }\n  }\n\n  updateSelected() {\n    const { res, selectedItems } = this.state;\n    let rows = res.map(post => {\n      post.selected = selectedItems.includes(post.id);\n      return post;\n    });\n\n    this.setState({\n      res: rows\n    });\n  }\n\n  fetch(page, perPage) {\n    fetch(`https://my-json-server.typicode.com/jenny-s51/cardviewdata/posts?_page=${page}&_limit=${perPage}`)\n      .then(resp => resp.json())\n      .then(resp => this.setState({ res: resp, perPage, page }))\n      .then(() => this.updateSelected())\n      .catch(err => this.setState({ error: err }));\n  }\n\n  componentDidMount() {\n    this.fetch(this.state.page, this.state.perPage);\n  }\n\n  renderPagination() {\n    const { page, perPage, totalItemCount } = this.state;\n\n    const defaultPerPageOptions = [\n      {\n        title: '1',\n        value: 1\n      },\n      {\n        title: '5',\n        value: 5\n      },\n      {\n        title: '10',\n        value: 10\n      }\n    ];\n\n    return (\n      <Pagination\n        itemCount={totalItemCount}\n        page={page}\n        perPage={perPage}\n        perPageOptions={defaultPerPageOptions}\n        onSetPage={(_evt, value) => {\n          this.fetch(value, perPage);\n        }}\n        onPerPageSelect={(_evt, value) => {\n          this.fetch(1, value);\n        }}\n        variant=\"top\"\n        isCompact\n      />\n    );\n  }\n\n  buildSelectDropdown() {\n    const { splitButtonDropdownIsOpen, selectedItems, areAllSelected } = this.state;\n    const numSelected = selectedItems.length;\n    const allSelected = areAllSelected;\n    const anySelected = numSelected > 0;\n    const someChecked = anySelected ? null : false;\n    const isChecked = allSelected ? true : someChecked;\n    const splitButtonDropdownItems = [\n      <DropdownItem key=\"item-1\" onClick={this.selectNone.bind(this)}>\n        Select none (0 items)\n      </DropdownItem>,\n      <DropdownItem key=\"item-2\" onClick={this.selectPage.bind(this)}>\n        Select page ({this.state.perPage} items)\n      </DropdownItem>,\n      <DropdownItem key=\"item-3\" onClick={this.selectAll.bind(this)}>\n        Select all ({this.state.totalItemCount} items)\n      </DropdownItem>\n    ];\n\n    return (\n      <Dropdown\n        position={DropdownPosition.left}\n        onSelect={this.onSplitButtonSelect}\n        toggle={\n          <DropdownToggle\n            splitButtonItems={[\n              <DropdownToggleCheckbox\n                id=\"example-checkbox-2\"\n                key=\"split-checkbox\"\n                aria-label={anySelected ? 'Deselect all' : 'Select all'}\n                isChecked={areAllSelected}\n                onClick={this.splitCheckboxSelectAll.bind(this)}\n              ></DropdownToggleCheckbox>\n            ]}\n            onToggle={this.onSplitButtonToggle}\n          >\n            {numSelected !== 0 && <React.Fragment>{numSelected} selected</React.Fragment>}\n          </DropdownToggle>\n        }\n        isOpen={splitButtonDropdownIsOpen}\n        dropdownItems={splitButtonDropdownItems}\n      />\n    );\n  }\n\n  buildFilterDropdown() {\n    const { isLowerToolbarDropdownOpen, filters } = this.state;\n\n    const filterDropdownItems = [\n      <SelectOption key=\"patternfly\" value=\"Patternfly\" />,\n      <SelectOption key=\"activemq\" value=\"ActiveMQ\" />,\n      <SelectOption key=\"apachespark\" value=\"Apache Spark\" />,\n      <SelectOption key=\"avro\" value=\"Avro\" />,\n      <SelectOption key=\"azureservices\" value=\"Azure Services\" />,\n      <SelectOption key=\"crypto\" value=\"Crypto\" />,\n      <SelectOption key=\"dropbox\" value=\"DropBox\" />,\n      <SelectOption key=\"jbossdatagrid\" value=\"JBoss Data Grid\" />,\n      <SelectOption key=\"rest\" value=\"REST\" />,\n      <SelectOption key=\"swagger\" value=\"SWAGGER\" />\n    ];\n\n    return (\n      <ToolbarFilter categoryName=\"Products\" chips={filters.products} deleteChip={this.onDelete}>\n        <Select\n          variant={SelectVariant.checkbox}\n          aria-label=\"Products\"\n          onToggle={this.onToolbarDropdownToggle}\n          onSelect={this.onNameSelect}\n          selections={filters.products}\n          isExpanded={isLowerToolbarDropdownOpen}\n          placeholderText=\"Creator\"\n        >\n          {filterDropdownItems}\n        </Select>\n      </ToolbarFilter>\n    );\n  }\n\n  render() {\n    const {\n      isUpperToolbarDropdownOpen,\n      isLowerToolbarDropdownOpen,\n      isUpperToolbarKebabDropdownOpen,\n      isLowerToolbarKebabDropdownOpen,\n      isCardKebabDropdownOpen,\n      splitButtonDropdownIsOpen,\n      activeItem,\n      filters,\n      res,\n      checked,\n      selectedItems,\n      itemsCheckedByDefault,\n      areAllSelected,\n      isChecked\n    } = this.state;\n\n    const toolbarKebabDropdownItems = [\n      <OverflowMenuDropdownItem key=\"link\">Link</OverflowMenuDropdownItem>,\n      <OverflowMenuDropdownItem key=\"action\" component=\"button\">\n        Action\n      </OverflowMenuDropdownItem>,\n      <OverflowMenuDropdownItem key=\"disabled link\" isDisabled>\n        Disabled Link\n      </OverflowMenuDropdownItem>,\n      <OverflowMenuDropdownItem key=\"disabled action\" isDisabled component=\"button\">\n        Disabled Action\n      </OverflowMenuDropdownItem>,\n      <DropdownSeparator key=\"separator\" />,\n      <OverflowMenuDropdownItem key=\"separated link\">Separated Link</OverflowMenuDropdownItem>,\n      <OverflowMenuDropdownItem key=\"separated action\" component=\"button\">\n        Separated Action\n      </OverflowMenuDropdownItem>\n    ];\n\n    const toolbarItems = (\n      <React.Fragment>\n        <ToolbarItem variant=\"bulk-select\">{this.buildSelectDropdown()}</ToolbarItem>\n        <ToolbarItem toggleIcon={<FilterIcon />} breakpoint=\"xl\">{this.buildFilterDropdown()}</ToolbarItem>\n        <ToolbarItem variant=\"overflow-menu\">\n          <OverflowMenu breakpoint=\"md\">\n            <OverflowMenuItem>\n              <Button variant=\"primary\">Create a Project</Button>\n            </OverflowMenuItem>\n            <OverflowMenuControl hasAdditionalOptions>\n              <Dropdown\n                onSelect={this.onToolbarKebabDropdownSelect}\n                toggle={<KebabToggle onToggle={this.onToolbarKebabDropdownToggle} id=\"toggle-id-6\" />}\n                isOpen={isLowerToolbarKebabDropdownOpen}\n                isPlain\n                dropdownItems={toolbarKebabDropdownItems}\n              />\n            </OverflowMenuControl>\n          </OverflowMenu>\n        </ToolbarItem>\n        <ToolbarItem variant=\"pagination\" alignment={{ default: 'alignRight' }}>\n          {this.renderPagination()}\n        </ToolbarItem>\n      </React.Fragment>\n    );\n\n    const PageNav = (\n      <Nav onSelect={this.onNavSelect} aria-label=\"Nav\">\n        <NavList>\n          <NavItem itemId={0} isActive={activeItem === 0}>\n            System Panel\n          </NavItem>\n          <NavItem itemId={1} isActive={activeItem === 1}>\n            Policy\n          </NavItem>\n          <NavItem itemId={2} isActive={activeItem === 2}>\n            Authentication\n          </NavItem>\n          <NavItem itemId={3} isActive={activeItem === 3}>\n            Network Services\n          </NavItem>\n          <NavItem itemId={4} isActive={activeItem === 4}>\n            Server\n          </NavItem>\n        </NavList>\n      </Nav>\n    );\n\n    const kebabDropdownItems = [\n      <DropdownItem>\n        <CogIcon /> Settings\n      </DropdownItem>,\n      <DropdownItem>\n        <HelpIcon /> Help\n      </DropdownItem>\n    ];\n    const userDropdownItems = [\n      <DropdownGroup key=\"group 2\">\n        <DropdownItem key=\"group 2 profile\">My profile</DropdownItem>\n        <DropdownItem key=\"group 2 user\" component=\"button\">\n          User management\n        </DropdownItem>\n        <DropdownItem key=\"group 2 logout\">Logout</DropdownItem>\n      </DropdownGroup>\n    ];\n    const headerTools = (\n      <PageHeaderTools>\n        <PageHeaderToolsGroup\n          visibility={{\n            default: 'hidden',\n            lg: 'visible'\n          }} /** the settings and help icon buttons are only visible on desktop sizes and replaced by a kebab dropdown for other sizes */\n        >\n          <PageHeaderToolsItem>\n            <Button aria-label=\"Settings actions\" variant={ButtonVariant.plain}>\n              <CogIcon />\n            </Button>\n          </PageHeaderToolsItem>\n          <PageHeaderToolsItem>\n            <Button aria-label=\"Help actions\" variant={ButtonVariant.plain}>\n              <HelpIcon />\n            </Button>\n          </PageHeaderToolsItem>\n        </PageHeaderToolsGroup>\n        <PageHeaderToolsGroup>\n          <PageHeaderToolsItem\n            visibility={{\n              lg: 'hidden'\n            }} /** this kebab dropdown replaces the icon buttons and is hidden for desktop sizes */\n          >\n            <Dropdown\n              isPlain\n              position=\"right\"\n              onSelect={this.onKebabDropdownSelect}\n              toggle={<KebabToggle onToggle={this.onPageToolbarKebabDropdownToggle} />}\n              isOpen={isUpperToolbarKebabDropdownOpen}\n              dropdownItems={kebabDropdownItems}\n            />\n          </PageHeaderToolsItem>\n          <PageHeaderToolsItem\n            visibility={{ default: 'hidden', md: 'visible' }} /** this user dropdown is hidden on mobile sizes */\n          >\n            <Dropdown\n              isPlain\n              position=\"right\"\n              onSelect={this.onPageDropdownSelect}\n              isOpen={isUpperToolbarDropdownOpen}\n              toggle={<DropdownToggle onToggle={this.onPageDropdownToggle}>John Smith</DropdownToggle>}\n              dropdownItems={userDropdownItems}\n            />\n          </PageHeaderToolsItem>\n        </PageHeaderToolsGroup>\n        <Avatar src={imgAvatar} alt=\"Avatar image\" />\n      </PageHeaderTools>\n    );\n\n    const Header = (\n      <PageHeader logo={<Brand src={imgBrand} alt=\"Patternfly Logo\" />} headerTools={headerTools} showNavToggle />\n    );\n    const Sidebar = <PageSidebar nav={PageNav} />;\n    const pageId = 'main-content-card-view-default-nav';\n    const PageSkipToContent = <SkipToContent href={`#${pageId}`}>Skip to Content</SkipToContent>;\n\n    const filtered =\n      filters.products.length > 0\n        ? res.filter(card => {\n            return filters.products.length === 0 || filters.products.includes(card.name);\n          })\n        : res;\n\n    const icons = {\n      pfIcon,\n      activeMQIcon,\n      sparkIcon,\n      avroIcon,\n      azureIcon,\n      saxonIcon,\n      dropBoxIcon,\n      infinispanIcon,\n      restIcon,\n      swaggerIcon\n    };\n\n    return (\n      <React.Fragment>\n        <Page\n          header={Header}\n          sidebar={Sidebar}\n          isManagedSidebar\n          skipToContent={PageSkipToContent}\n          mainContainerId={pageId}\n        >\n          <PageSection variant={PageSectionVariants.light}>\n            <TextContent>\n              <Text component=\"h1\">Projects</Text>\n              <Text component=\"p\">This is a demo that showcases Patternfly Cards.</Text>\n            </TextContent>\n            <Toolbar id=\"toolbar-group-types\" clearAllFilters={this.onDelete}>\n              <ToolbarContent>{toolbarItems}</ToolbarContent>\n            </Toolbar>\n          </PageSection>\n          <PageSection>\n            <Gallery hasGutter>\n              {filtered.map((product, key) => (\n                <React.Fragment>\n                  <Card isHoverable key={key}>\n                    <CardHeader>\n                      <img src={icons[product.icon]} alt={`${product.name} icon`} style={{ height: '50px' }} />\n                      <CardActions>\n                        <Dropdown\n                          isPlain\n                          position=\"right\"\n                          onSelect={e => this.onCardKebabDropdownSelect(key, e)}\n                          toggle={\n                            <KebabToggle\n                              onToggle={isCardKebabDropdownOpen =>\n                                this.onCardKebabDropdownToggle(key, isCardKebabDropdownOpen)\n                              }\n                            />\n                          }\n                          isOpen={this.state[key]}\n                          dropdownItems={[\n                            <DropdownItem onClick={this.deleteItem(product)} position=\"right\">\n                              <TrashIcon />\n                              Delete\n                            </DropdownItem>\n                          ]}\n                        />\n                        <Checkbox\n                          checked={isChecked}\n                          value={product.id}\n                          selectedItems={selectedItems}\n                          areAllSelected={areAllSelected}\n                          onChange={this.handleCheckboxClick}\n                          isChecked={selectedItems.includes(product.id)}\n                          defaultChecked={this.state.itemsCheckedByDefault}\n                          aria-label=\"card checkbox example\"\n                          id={`check-${product.id}`}\n                        />\n                      </CardActions>\n                    </CardHeader>\n                    <CardTitle>{product.name}</CardTitle>\n                    <CardBody>{product.description}</CardBody>\n                  </Card>\n                </React.Fragment>\n              ))}\n            </Gallery>\n          </PageSection>\n        </Page>\n      </React.Fragment>\n    );\n  }\n}","title":"Basic","lang":"js","isFullscreen":true}}>
    </Example>
  </React.Fragment>
);
DocumentationDemosCardViewReactDocs.Component.displayName = 'DocumentationDemosCardViewReactDocs';
