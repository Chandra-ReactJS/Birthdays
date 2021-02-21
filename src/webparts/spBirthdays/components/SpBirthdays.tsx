import * as React from 'react';
import styles from './SpBirthdays.module.scss';
import { ISpBirthdaysProps } from './ISpBirthdaysProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ISpBirthdaysState } from './ISpBirthdaysState';
import { SPServices } from '../services/SPService';

import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

export default class SpBirthdays extends React.Component<ISpBirthdaysProps, ISpBirthdaysState> {
  private service: SPServices = null;

  constructor(props: ISpBirthdaysProps) {
    super(props);
    this.service = new SPServices(props.wpContext);
    this.state = {
      fetchingData: false,
      birthdays: []
    };
  }
  public componentDidMount(): void {
    this.setState({
      fetchingData: true
    });
    this.service.getBirthdays().then((listitems) => {
      let filteredItems = listitems;
      // filteredItems = listitems.filter(listitem => {
      //   if (new Date(listitem.Date).getTime() > new Date().getTime())
      //     return <li>{listitem.Name.Title}</li>;
      // });
      filteredItems.sort((a, b) => {
        return new Date(a.Date).getTime() - new Date(b.Date).getTime();
      });
      this.setState({
        birthdays: filteredItems
      });
      console.log(filteredItems);
    });
  }
  private getFormattedDate(d: string) {
    var date = new Date(d);
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  }
  public render(): React.ReactElement<ISpBirthdaysProps> {
    return (
      <div className={styles.spBirthdays}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.upcoming}>
                Upcoming Birthdays
              </div>
              <div>
                {
                  this.state.birthdays.map(listitem => {
                    //if (new Date(listitem.Date).getTime() > new Date().getTime())
                    return <div className={styles.topMargin}><Persona
                      imageUrl={'https://nam.delve.office.com/mt/v3/people/profileimage?userId=' + listitem.Name.EMail + '&size=L'}
                      text={listitem.Name.Title}
                      size={PersonaSize.size48}
                      secondaryText={this.getFormattedDate(listitem.Date)}
                    /></div>;
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
