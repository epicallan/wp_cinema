<?php 
require 'allan_db.php';
class Session
{
    private $_timeout;
    private $_db;

    public function __construct() {
		
        $this->_db=ConnectDB::Connect('cinema');
		ini_set("session.use_only_cookies", "1");
       	ini_set('session.gc_maxlifetime', 60 * 60 * 24 * 14);
		ini_set('session.cookie_lifetime', 60 * 60 * 24 * 14);
		$this->_timeout= get_cfg_var("session.gc_maxlifetime"); 
		
		
	}// enc construct

    public function _open() {
		
        return TRUE;
		
    }

    public function _close() {

        return TRUE;
    }

    public function _read($session_id) {

        $db         = $this->_db;
		$session_id = mysql_real_escape_string($session_id);
        $sql        = "SELECT session_data FROM   SESSION WHERE  session_id = '$session_id'";
		$result=mysql_query($sql,$this->_db);
		$row = mysql_fetch_assoc($result);
		foreach($row as $key=>$value){
				//echo $key ."->" .$value."<br>";
				}
		 echo 'reading: ';		
		 return $row['session_data'];
    
	}

    public function _write($session_id, $session_data) {
		
        $db              = $this->_db;
        $session_id      = mysql_real_escape_string($session_id);
        $session_data    = mysql_real_escape_string($session_data);
        $session_expires = time() + $this->_timeout;
		$sql = "REPLACE INTO SESSION (session_id,    session_data,    session_expires)
                             VALUES  ('$session_id', '$session_data', $session_expires)";
		
		$res=mysql_query($sql,$this->_db);
		if(!$res){
		echo mysql_error($this->_db);
		}
		echo "writing :  ";
    }

    public function _gc($max) {

       mysql_query("DELETE FROM session WHERE session_expires < ".time(),$this->_db);
      
	   return true;
  	}

    public function _destroy($session_id) {

        $db         = $this->_db;
        $session_id = $db->mysql_real_escape_string($session_id);
        $sql        = "DELETE
                FROM   SESSION
                WHERE  session_id = '$session_id'";

        return mysql_query($sql,$this->_db);
    }
	public function register(){
		$registered = session_set_save_handler(
            array($this, '_open'),
            array($this, '_close'),
            array($this, '_read'),
            array($this, '_write'),
            array($this, '_destroy'),
            array($this, '_gc')
        );
        if (!$registered) {
            throw new Exception('Can not register session savehandler.');
        }
		
		}

}// end sessions class
$s = new Session();
$s->register();
session_start();


?>