#Pagination
#In web development, pagination helps break large lists into smaller, manageable chunks (pages), making it easier to navigate content like search results, product listings, or articles.
#Create a Pagination class that simulates a basic pagination system.
#Step 1: Create the Pagination Class
#Define a class called Pagination to represent paginated content.
#It should optionally accept a list of items and a page size when initialized.
#Step 2: Implement the __init__ Method
#Accept two optional parameters:
#items (default None): a list of items
#page_size (default 10): number of items per page
#If items is None, initialize it as an empty list.
#Save page_size and set current_idx (current page index) to 0.
#Calculate total number of pages using math.ceil.
#Step 3: Implement the get_visible_items() Method
#This method returns the list of items visible on the current page.
#Use slicing based on the current_idx and page_size.
#Step 4: Implement Navigation Methods
#These methods should help navigate through pages:

go_to_page(page_num)
→ Goes to the specified page number (1-based indexing).
→ If page_num is out of range, raise a ValueError.

first_page()
→ Navigates to the first page.

last_page()
→ Navigates to the last page.

next_page()
→ Moves one page forward (if not already on the last page).

previous_page()
→ Moves one page backward (if not already on the first page).

📝 Note:

Pages are indexed internally from 0, but user input is expected to start at 1.
All navigation methods (except go_to_page) should return self to allow method chaining.

import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        self.items = items or []
        self.page_size = page_size
        self.current_idx = 0
        self.total_pages = math.ceil()

    def get_visible_items(self):
        return self.items[self.current_idx:self.current_idx+self.page_size]

    def go_to_page(page_num):
