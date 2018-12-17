import {Controller} from 'stimulus';
import Choices from 'choices.js'

export default class extends Controller {
    /**
     *
     */
    connect() {
        const select = this.element.querySelector('select');
        let timer = null;





        const choices = new Choices(select, {
            silent: false,
            items: [{
                value: 'Value 1',
                label: 'Label 1',
                id: 1
            }, {
                    value: 'Value 2',
                    label: 'Label 2',
                    id: 2,
                    customProperties: {
                        random: 'I am a custom property'
                    }
            }],
            choices: [],
            renderChoiceLimit: -1,
            maxItemCount: -1,
            addItems: true,
            removeItems: true,
            removeItemButton: false,
            editItems: false,
            duplicateItemsAllowed: false,
            delimiter: ',',
            paste: true,
            searchEnabled: true,
            searchChoices: true,
            searchFloor: 1,
            searchResultLimit: 10,
            searchFields: ['label', 'value'],
            position: 'auto',
            resetScrollPosition: true,
            regexFilter: null,
            shouldSort: true,
            shouldSortItems: false,
            placeholder: true,
            placeholderValue: "test",
            searchPlaceholderValue: null,
            prependValue: null,
            appendValue: null,
            renderSelectedChoices: 'auto',
            loadingText: 'Loading...',
            noResultsText: 'No results found',
            noChoicesText: 'No choices to choose from',
            itemSelectText: 'Press to select',
            addItemText: (value) => {
                return `Press Enter to add <b>"${value}"</b>`;
            },
            maxItemText: (maxItemCount) => {
                return `Only ${maxItemCount} values can be added`;
            },
            itemComparer: (choice, item) => {
                return choice === item;
            },
            classNames: {
                containerOuter: 'choices',
                containerInner: 'choices__inner',
                input: 'choices__input',
                inputCloned: 'choices__input--cloned',
                list: 'choices__list',
                listItems: 'choices__list--multiple',
                listSingle: 'choices__list--single',
                listDropdown: 'choices__list--dropdown',
                item: 'choices__item',
                itemSelectable: 'choices__item--selectable',
                itemDisabled: 'choices__item--disabled',
                itemChoice: 'choices__item--choice',
                placeholder: 'choices__placeholder',
                group: 'choices__group',
                groupHeading: 'choices__heading',
                button: 'choices__button',
                activeState: 'is-active',
                focusState: 'is-focused',
                openState: 'is-open',
                disabledState: 'is-disabled',
                highlightedState: 'is-highlighted',
                hiddenState: 'is-hidden',
                flippedState: 'is-flipped',
                loadingState: 'is-loading',
                noResults: 'has-no-results',
                noChoices: 'has-no-choices'
            },
            // Choices uses the great Fuse library for searching. You
            // can find more options here: https://github.com/krisk/Fuse#options
            fuseOptions: {
                include: 'score'
            },
            callbackOnInit: null,
            callbackOnCreateTemplates: null
        })
            /*
            .ajax(function(callback) {
            fetch('https://api.discogs.com/artists/55980/releases?token=QBRmstCkwXEvCjTclCpumbtNwvVkEzGAdELXyRyW')
                .then(function(response) {
                    response.json().then(function(data) {
                        callback(data.releases, 'title', 'title');
                    });
                })
                .catch(function(error) {
                    console.error(error);
                });
        });
        */


        choices.passedElement.addEventListener('search', function (event) {
            if (event.detail.value.length > 3) {

                if (null !== timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function () {

                    fetch('https://api.discogs.com/artists/55980/releases?token=QBRmstCkwXEvCjTclCpumbtNwvVkEzGAdELXyRyW'+"?term=" + event.detail.value)
                        .then(function (response) {
                            if (200 === response.status) {
                                response.json().then(function (data) {
                                    choice.setChoices(data, 'id', 'label', true);
                                });
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                        })
                    ;
                }, 340)
            }
        });

        /*
        axios.post(this.data.get('url-value')).then((response) => {
            $(select)
                .append(new Option(response.data.text, response.data.id, true, true))
                .trigger('change');
        });
        */

    }
}
