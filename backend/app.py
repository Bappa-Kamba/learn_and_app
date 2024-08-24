from src import create_app

app = create_app()

@app.before_request
def clear_trailing():
    """
        Redirects URLs with a trailing slash to the same URL without the trailing slash.
    """
    from flask import redirect, request

    rp = request.path 
    if rp != '/' and rp.endswith('/'):
        return redirect(rp[:-1])

if __name__ == "__main__":
    app.run(debug=True)
