import random

# ANSI escape codes for setting text color
COLOR_PINK = '\033[38;2;228;131;178m'
COLOR_PURPLE = '\033[38;2;170;102;204m'
COLOR_RESET = '\033[0m'

def generate_random_category():
    categories = ['Animals', 'Countries', 'Fruits', 'Movies', 'School Subjects', 'Colors', 'Sports', 'Musical Instruments', 'Food', 'Famous People', 'Superheroes', 'Book Genres', 'Board Games', 'Science Experiments', 'Insects', 'Historical Figures', 'Car Brands', 'Cartoon Characters', 'Video Games', 'Space Exploration']
    return random.choice(categories)

def generate_random_number_category():
    numbers = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
    return random.choice(numbers)

def generate_random_rule(selected_category):
    letter = random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    double_letter = random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    syllable_count = random.randint(1, 3)

    rule_options = [
        f'Name a {selected_category.lower()} that starts with the letter "{letter}".',
        f'Name a {selected_category.lower()} that ends with the letter "{letter}".',
        f'Name a {selected_category.lower()} that contains the letter "{letter}".',
        f'Name a {selected_category.lower()} that has {syllable_count} syllables.',
        f'Name a {selected_category.lower()} that does not contain the letter "{letter}".',
        f'Name a {selected_category.lower()} that contains any double letters.'
    ]

    return random.choice(rule_options)

def get_random_affirmation():
    affirmations = [
        f'{COLOR_PINK}Great job!{COLOR_RESET}',
        f'{COLOR_PINK}Well done!{COLOR_RESET}',
        f'{COLOR_PINK}Fantastic!{COLOR_RESET}',
        f'{COLOR_PINK}Excellent!{COLOR_RESET}',
        f'{COLOR_PINK}Awesome!{COLOR_RESET}'
    ]
    return random.choice(affirmations)

def main():
    num_players = int(input(f"{COLOR_PINK}Enter the number of players:{COLOR_RESET} "))
    player_names = [input(f"{COLOR_PURPLE}Enter the name of player {i + 1}:{COLOR_RESET} ") for i in range(num_players)]

    total_turns = 10
    current_turn = 0
    player_points = {name: 0 for name in player_names}

    while current_turn < total_turns:
        current_turn += 1
        print(f"\n{COLOR_PINK}Turn {current_turn}{COLOR_RESET}")

        random_category = generate_random_category()
        random_rule = generate_random_rule(random_category)

        print(f'{COLOR_PINK}Category:{COLOR_RESET} {random_category}')
        print(f'{COLOR_PINK}Rule:{COLOR_RESET} {random_rule}')

        # Ask for a number 1-9 and update the corresponding category
        number_category = generate_random_number_category()
        user_input = input()

        if user_input.lower() == "done":
            break  # End the game if a player types "done"

        number = int(user_input)
        player_points[player_names[number - 1]] += 1
        print(f'Adding a point to {number_category} category for player {number}.\n')

    print("\nGame Over! Points after the last completed turn:")
    for player, points in player_points.items():
        print(f'{player}: {points} points')

    if user_input.lower() == "done":
        highest_scorer = max(player_points, key=player_points.get)
        print(f"\n{get_random_affirmation()} {highest_scorer} is the winner with {player_points[highest_scorer]} points!")
    else:
        play_again = input(f"\nDo you want to continue playing? ({COLOR_PINK}yes{COLOR_RESET}/{COLOR_PINK}no{COLOR_RESET}): ").lower()
        if play_again == 'yes':
            main()
        else:
            highest_scorer = max(player_points, key=player_points.get)
            print(f"\n{get_random_affirmation()} {highest_scorer} is the winner with {player_points[highest_scorer]} points!")
            print("Thank you for playing!")

if __name__ == "__main__":
    main()
