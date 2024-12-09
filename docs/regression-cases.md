# Regression cases

Prepared for this change. **Not executed.** Tests, manual checks, lint and builds require explicit user authorization. Use isolated fixtures; never run destructive cases against production.

| Case | Input or setup | Expected outcome |
| --- | --- | --- |
| Post authorization | A valid session for user A updates/deletes a post owned by B | 401; the post remains unchanged |
| Input validation | POST /api/posts with empty body, 501-character desc, invalid image URL or userId B | 400; no post created |
| Identity | Delete a different user with a non-admin session; repeat with a deleted account JWT | 401; no mutation |
| Uploads | Registration with an uploaded image fails validation or database save | Temporary file removed; uploaded Cloudinary asset removed if user was not saved |
| Password | Save an unchanged existing password then log in | Password is not hashed twice; responses omit password |

## Additional cases (not executed)

| Case | Input or setup | Expected outcome |
| --- | --- | --- |
| Concurrent likes | Two different users like the same post concurrently | Both likes remain present |
| Partial edit | Clear text on an image post; clear all content | Image-only edit succeeds; empty post is rejected |

| Image removal | Clear the image while text remains | Image field is unset; validation succeeds |
| Concurrent edits | Simultaneously clear text and image from the same post | One edit conflicts with HTTP 409; content cannot become empty |
