import pandas as pd
import praw
import os
import json
from praw.models import MoreComments

reddit = praw.Reddit(
    client_id="MttGuRoKzA8ype_z7YsYqQ",
    client_secret="FZQOuPSR9vl1sxaro1YtFkVYihDJdA",
    user_agent="MusicTasteAnalyzerSC",
    check_for_async=False
)

subreddit_name = "RoastMyMusic"

# Number of posts to scrape
num_posts_to_scrape = 100  # You can adjust this number

# Create an empty list to store title-comment pairs
post_data = []

# Iterate through hot posts in the subreddit
for submission in reddit.subreddit(subreddit_name).hot(limit=num_posts_to_scrape):
    # Append title and comments to the list
    post_data.append({
        'title': submission.title,
        'comments': [comment.body for comment in submission.comments if type(comment) != MoreComments]
    })

# Create a DataFrame from the collected data
subreddit_data_df = pd.DataFrame(post_data)


# # URL of the post
# url = "https://www.reddit.com/r/popheadscirclejerk/comments/17vd2mj/did_she_actually_say_this/"
 
# # Creating a submission object
# submission = reddit.submission(url=url)


# post_comments = []
 
# for comment in submission.comments:
#     if type(comment) == MoreComments:
#         continue
 
#     post_comments.append(comment.body)
 
# # creating a dataframe
# comments_df = pd.DataFrame(post_comments, columns=['comment'])
# new_comments_json = comments_df.to_json(orient='records')

file_path = 'comments_data.json'

# Check if the file already exists
if os.path.exists(file_path):
    # Read existing JSON data from the file
    with open(file_path, 'r') as json_file:
        existing_comments_json = json_file.read()

    # Convert existing JSON data to a DataFrame
    existing_comments_df = pd.read_json(existing_comments_json, orient='records')

    # Append new data to existing data
    updated_comments_df = pd.concat([existing_comments_df, subreddit_data_df], ignore_index=True)

    # Convert the updated DataFrame to JSON
    updated_comments_json = updated_comments_df.to_json(orient='records')


# Write the updated JSON data to the file
with open(file_path, 'w') as json_file:
    json.dump(subreddit_data_df.to_dict(orient='records'), json_file, indent=2)


print(f'Updated JSON data has been saved to {file_path}')

