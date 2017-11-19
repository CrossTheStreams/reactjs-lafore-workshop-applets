import React, { Component } from 'react';
import { 
  FormControl, ControlLabel,
  Radio, Button } from 'react-bootstrap';
import WorkshopLayout from './WorkshopLayout';

export default class ArrayWS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      array: this.filledArray(false,60,20),
      allowDuplicates: false,
      activeIndex: 0,
      rightPanelText: "Press any button"
    };
  }

  // create an array with filled with (some number of) random numbers
  filledArray(allowDuplicates, arrayLength, fillLength) {
    let generateRandomNumForArray = (array) => {
      let randomNumber = () => {
        return parseInt(Math.random().toString().slice(2,5), 10);
      }
      if (allowDuplicates) {
        return randomNumber();
      } else {
        let number = randomNumber();
        let containsNumber = (num) => {
          let idx = array.findIndex((n) => {
            return n === num;
          });
          return idx !== -1;
        }
        while (containsNumber(number)) {
          number = randomNumber();
        };
        return number;
      }
    };

    let newArray = new Array(arrayLength);
    newArray.fill(undefined);

    for (var i = 0; i < fillLength; i++) { 
      newArray[i] = generateRandomNumForArray(newArray);
    }

    return newArray;
  }

  handleFillClick = () => {
    const numberFieldValue = this.state.numberFieldValue,
          allowDuplicates = this.state.allowDuplicates,
          arrayLength = this.state.array.length;

    if (numberFieldValue === undefined) {
      alert('Enter size of array to create in the "Number" field');
    } else if (numberFieldValue > arrayLength) {
      alert(`Can't fill more than ${arrayLength} items`);
    } else {
      this.setState({
        array: this.filledArray(allowDuplicates,arrayLength,numberFieldValue),
        activeIndex: 0,
      });
    }
  }

  handleDeleteClick = () => {
  }

  handleInsertClick = () => { 
    const numberFieldValue = this.state.numberFieldValue,
          allowDuplicates = this.state.allowDuplicates,
          array = this.state.array,
          indexOfNumberFieldValue = array.findIndex((n) => {return(n == numberFieldValue)})
    let activeIndex = this.state.activeIndex;

    if (numberFieldValue === undefined || numberFieldValue < 0 || numberFieldValue > 999) {
      alert('Must enter key between 0 and 999 for insertion.');
    } else if (!allowDuplicates && indexOfNumberFieldValue > -1) { 
      alert(`Duplicates aren't currently allowed and value ${numberFieldValue} is located at index ${indexOfNumberFieldValue}`);
    } else {
      let newArray = array.slice();
      for (var i = 0; i < newArray.length; i++) {
        let item = newArray[i];
        if (item === undefined) {
          newArray[i] = numberFieldValue;
          activeIndex = i;
          break;
        }
      }
      this.setState({
        array: newArray,
        activeIndex: activeIndex,
      });
    }
  }

  handleNewClick = () => {
    const numberFieldValue = this.state.numberFieldValue,
          allowDuplicates = this.state.allowDuplicates;
    if (numberFieldValue === undefined) {
      alert('Enter size of array to create in the "Number" field');
    } else if (numberFieldValue > 60) {
      alert('Maximum array length allowed is 60. :)');
    } else {
      this.setState({
        array: this.filledArray(allowDuplicates,numberFieldValue,0),
        activeIndex: 0,
      });
    }
  }

  onAllowDuplicatesChange = (event) => {
    console.log("onAllowDuplicatesChange");
    console.log(event.target.value);
    let allowDuplicates = event.target.value;
    this.setState({allowDuplicates: allowDuplicates});
  }

  handleFindClick = () => { 
    const array = this.state.array,
          numberFieldValue = this.state.numberFieldValue;
    let activeIndex = this.state.activeIndex;

    if (this.state.currentOperation !== 'find') {
      this.setState({
        currentOperation: 'find',
        rightPanelText: 'Enter key of item to find'
      });
    } else {
      if (numberFieldValue !== undefined) {
        if (numberFieldValue === array[activeIndex]) {
          alert(`Found number ${numberFieldValue} at index ${activeIndex}`);
            this.setState({
              activeIndex: 0
            });
        } else {
          if (array[activeIndex + 1] === undefined || (activeIndex + 1) >= array.length) {
            this.setState({
              activeIndex: 0,
              rightPanelText: `Cant' locate item with key ${numberFieldValue}`
            });
          } else {
            this.setState((prevState) => ({
              activeIndex: prevState.activeIndex += 1
            }));
          }
        }
      }
    }
  }

  handleNumberFieldChange = (event) => {
    const numberFieldValue = parseInt(event.target.value, 10);
    if (!isNaN(numberFieldValue)) {
      this.setState({
        numberFieldValue: numberFieldValue
      });
    }
  }

  render() {
    const colorForItem = (number) => {
      if (number === undefined) {
        return "#fff";
      } else {
        let n = number/1000;
        return('#'+Math.floor(n*16777215).toString(16));
      }
    }
    //console.log(this.state.array.toString())
    const items = this.state.array.map((num, index) => {
      let text = ""
      if (num !== undefined) {
        text = num
      }
      let maybeRenderActiveIndexClass = (activeIndex) => {	
	if (index === this.state.activeIndex) {
	  return "active";
        }
      }
      return(
        <div key={index} className={maybeRenderActiveIndexClass()}>
          <div className="array-item-index">{index}</div>
          <div style={{backgroundColor: colorForItem(num)}} className="item">
            {text}
          </div>
        </div>
      )
    });

    return (
      <WorkshopLayout
        title={
          <div>
            <h1>Array</h1>
          </div>
        }
        leftPanelContent={
          <div>
            <Button onClick={this.handleNewClick}>New</Button>
            <Button onClick={this.handleFillClick}>Fill</Button>
            <Button onClick={this.handleInsertClick}>Ins</Button>
            <Button onClick={this.handleFindClick}>Find</Button>
            <Button onClick={this.handleDeleteClick}>Del</Button>
            <Radio name="dups" 
		   value="true"
                   onChange={this.onAllowDuplicatesChange}
                    inline>
               Dups OK
             </Radio>
             <Radio name="dups" 
	       value="false"
               defaultChecked
               onChange={this.onAllowDuplicatesChange}
               inline>
               No dups
             </Radio>
	     <div className="number-field-container">
	       <ControlLabel>Number:</ControlLabel>
	       <FormControl
		 type="text"
		 className="number-field"
		 //value={this.state.value}
		 //placeholder="Enter text"
		 onChange={this.handleNumberFieldChange}
	       />
	     </div>
             <div className="items">
               {items}
             </div>
          </div>
        }
        rightPanelContent={
          <div>
            <p>{this.state.rightPanelText}</p>
          </div>
        }
      />
    )
  }
}

