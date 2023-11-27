from flask import Flask, render_template, request, redirect, session, url_for
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

app.secret_key = ''

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'users'

mysql = MySQL(app)

@app.route('/')
@app.route('/login', methods = ['GET', 'POST'])
def login():
    message = ''
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM user WHERE username = %s AND password = %s', (username, password))
        user = cursor.fetchone()
        if user:
            session['loggedin'] = True
            session['username'] = user['username']
            cursor1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor1.execute('SELECT * FROM information WHERE username = %s', (username, ))
            data = cursor1.fetchall()
            return render_template("User.html", data = data)
        else:
            message = "Please enter correct username or password !"
            
    return render_template('Login.html', message = message)
@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('username', None)
    return redirect(url_for('login'))


@app.route('/register', methods = ['GET', 'POST'])
def register():
    message = ''
    if request.method == 'POST':
        name = request.form['Name']
        email_id = request.form['email_id']
        gender = request.form['gender']
        age = request.form['age']
        username = request.form['username']
        password = request.form['password']
        ph_number = request.form['phone_number']
        state = request.form['state']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM user WHERE username = % s', (username, ))
        account = cursor.fetchone()
        cursor1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor1.execute('SELECT * FROM user WHERE email_id = % s', (email_id, ))
        account1 = cursor1.fetchone()
        if account:
            message = 'Username already exists !'
        elif account1:
            message = 'Email id already taken!'
        else:
            cursor.execute('INSERT INTO user VALUES (% s, % s, % s, % s, % s, % s, % s, % s)', (name, email_id, gender, age, username, password, ph_number, state))
            mysql.connection.commit()
            message = 'You have successfully registered !'
    return render_template('Register.html', message = message)

@app.route('/user', methods=['GET', 'POST'])
def user():
    if request.method == 'POST':
        username = request.form['username']
        name = request.form['Name']
        email_id = request.form['email_id']
        ph_number = request.form['phone_number']
        address = request.form['address']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO information VALUES (% s, % s, % s, % s, % s)', (username, name, email_id, ph_number, address))
        mysql.connection.commit()
        cursor1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor1.execute('SELECT * FROM information WHERE username = % s', (username, ))
        data = cursor1.fetchall()
        mysql.connection.commit()
        return render_template('User.html', data = data)
    return render_template('User.html')


@app.route('/delete/<string:username>/<string:name>/<string:email_id>/<string:ph_number>/<string:address>')
def delete(username, name, email_id, ph_number, address):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(f"DELETE from information WHERE name='{name}' AND username='{username}' AND email_id = '{email_id}' AND ph_number = '{ph_number}' AND address = '{address}'")
    cursor.connection.commit()
    cursor1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor1.execute('SELECT * FROM information WHERE username = % s', (username, ))
    data = cursor1.fetchall()
    mysql.connection.commit()
    return render_template("User.html", data=data)

@app.route('/update/<string:username>/<string:name>', methods = ['GET', 'POST'])
def update(username, name):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(f"SELECT name, email_id, ph_number, address FROM information WHERE username = '{username}' AND name='{name}'")
    data = cursor.fetchall()
    mysql.connection.commit()
    if request.method == 'POST':
        email_id = request.form['email_id']
        ph_number = request.form['phone_number']
        address = request.form['address']
        cursor2 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor2.execute(f"UPDATE information SET email_id = '{email_id}', ph_number = '{ph_number}', address='{address}' WHERE username = '{username}' AND name = '{name}'")
        mysql.connection.commit()
        cursor3 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor3.execute('SELECT * FROM information WHERE username = % s', (username, ))
        data = cursor3.fetchall()
        return render_template('User.html', data=data)
    return render_template('Update.html', data = data)

if __name__ == '__main__':
    app.run(debug = True)
